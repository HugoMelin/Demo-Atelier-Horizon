<script setup lang="ts">
import { defineComponent, h, type PropType, type VNodeChild } from 'vue'

import type {
  RichTextBlock,
  RichTextImageData,
  RichTextNode,
  RichTextTextNode,
} from '@/types/richText'

defineProps<{
  richtext?: RichTextBlock[] | null
}>()

const safeUrl = (url?: string) => {
  if (!url) return undefined

  // Autorise les liens web, e-mail, téléphone, ancres et chemins internes.
  return /^(https?:|mailto:|tel:|\/|#|\.\.?(?:\/|$))/i.test(url) ? url : undefined
}

const safeTarget = (target?: string | null) => {
  const allowedTargets = ['_blank', '_self', '_parent', '_top']
  return target && allowedTargets.includes(target) ? target : undefined
}

const imageUrl = (image?: RichTextImageData) => {
  if (!image?.url) return undefined
  if (/^(?:https?:)?\/\//i.test(image.url) || image.url.startsWith('data:image/')) {
    return image.url
  }

  const apiUrl = import.meta.env.VITE_API_URL
  if (!apiUrl) return image.url

  try {
    return new URL(image.url, new URL(apiUrl).origin).toString()
  } catch {
    return image.url
  }
}

const renderText = (node: RichTextTextNode): VNodeChild => {
  let content: VNodeChild = node.text

  if (node.code) content = h('code', content)
  if (node.bold) content = h('strong', content)
  if (node.italic) content = h('em', content)
  if (node.underline) content = h('u', content)
  if (node.strikethrough) content = h('s', content)

  return content
}

const renderChildren = (node: { children?: RichTextNode[] }): VNodeChild[] =>
  (node.children ?? []).map(renderNode)

const renderNode = (node: RichTextNode): VNodeChild => {
  switch (node.type) {
    case 'text':
      return renderText(node)
    case 'link': {
      const href = safeUrl(node.url)
      const target = safeTarget(node.target)
      return href
        ? h(
            'a',
            {
              href,
              target,
              rel: target === '_blank' ? 'noopener noreferrer' : undefined,
            },
            renderChildren(node),
          )
        : h('span', renderChildren(node))
    }
    case 'paragraph': {
      const children = renderChildren(node)
      return h('p', children.length ? children : [h('br')])
    }
    case 'heading':
      return h(`h${Math.min(6, Math.max(1, node.level))}`, renderChildren(node))
    case 'list':
      return h(node.format === 'ordered' ? 'ol' : 'ul', renderChildren(node))
    case 'list-item':
      return h('li', renderChildren(node))
    case 'quote':
      return h('blockquote', renderChildren(node))
    case 'code':
      return h('pre', [
        h('code', { class: node.language ? `language-${node.language}` : undefined }, renderChildren(node)),
      ])
    case 'image': {
      const src = imageUrl(node.image)
      if (!src) return null

      return h('figure', [
        h('img', {
          src,
          alt: node.image.alternativeText ?? '',
          width: node.image.width ?? undefined,
          height: node.image.height ?? undefined,
          loading: 'lazy',
          decoding: 'async',
        }),
        node.image.caption ? h('figcaption', node.image.caption) : null,
      ])
    }
  }
}

const RichTextRenderer = defineComponent({
  name: 'RichTextRenderer',
  props: {
    nodes: {
      type: Array as PropType<RichTextBlock[]>,
      required: true,
    },
  },
  setup(props) {
    return () => props.nodes.map(renderNode)
  },
})
</script>

<template>
  <div v-if="richtext?.length" class="rich-text">
    <RichTextRenderer :nodes="richtext" />
  </div>
</template>

<style scoped>
.rich-text {
  color: inherit;
  overflow-wrap: anywhere;
}

.rich-text :deep(> * + *) {
  margin-top: 0rem;
}

.rich-text :deep(h1),
.rich-text :deep(h2),
.rich-text :deep(h3),
.rich-text :deep(h4),
.rich-text :deep(h5),
.rich-text :deep(h6) {
  margin-top: 1.5em;
}

.rich-text :deep(ul),
.rich-text :deep(ol) {
  padding-left: 1.5rem;
}

.rich-text :deep(ul) {
  list-style: disc;
}

.rich-text :deep(ol) {
  list-style: decimal;
}

.rich-text :deep(li + li) {
  margin-top: 0.375rem;
}

.rich-text :deep(a) {
  color: var(--color-sage);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.rich-text :deep(blockquote) {
  border-left: 3px solid var(--color-sage);
  padding-left: 1rem;
  font-style: italic;
}

.rich-text :deep(code) {
  border-radius: 0.25rem;
  background: color-mix(in srgb, currentColor 8%, transparent);
  padding: 0.1em 0.3em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
}

.rich-text :deep(pre) {
  overflow-x: auto;
  border-radius: 0.5rem;
  background: var(--color-navy);
  padding: 1rem;
  color: white;
}

.rich-text :deep(pre code) {
  background: transparent;
  padding: 0;
}

.rich-text :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

.rich-text :deep(figcaption) {
  margin-top: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  text-align: center;
}
</style>

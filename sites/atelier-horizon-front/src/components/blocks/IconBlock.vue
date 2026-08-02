<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import { icons } from '@lucide/vue'
import type { LucideIcon } from '@lucide/vue'

import type { IconBlock } from '@/types'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  icon?: IconBlock | null
}>()

const attrs = useAttrs()
const imageHasError = ref(false)
const iconRegistry = icons as Record<string, LucideIcon>

const imageUrl = computed(() => {
  const url = props.icon?.Image?.url

  if (!url || imageHasError.value) return null
  if (/^(?:https?:)?\/\//.test(url) || url.startsWith('data:')) return url

  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl) return url

  try {
    return new URL(url, new URL(apiUrl).origin).toString()
  } catch {
    return url
  }
})

const lucideIcon = computed<LucideIcon | null>(() => {
  const name = props.icon?.Lucid?.trim()

  if (!name) return null

  // Strapi peut contenir le nom Vue (`CircleCheck`) ou le slug Lucide
  // copié depuis le catalogue (`circle-check`).
  const componentName = name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  return iconRegistry[name] ?? iconRegistry[componentName] ?? null
})

watch(
  () => props.icon?.Image?.url,
  () => {
    imageHasError.value = false
  },
)
</script>

<template>
  <img
    v-if="imageUrl"
    v-bind="attrs"
    :src="imageUrl"
    :alt="icon?.Image?.alternativeText ?? ''"
    class="block size-6 shrink-0 object-contain"
    decoding="async"
    @error="imageHasError = true"
  />

  <component
    :is="lucideIcon"
    v-else-if="lucideIcon"
    v-bind="attrs"
    class="block size-6 shrink-0"
    :aria-hidden="attrs['aria-label'] ? undefined : true"
  />
</template>

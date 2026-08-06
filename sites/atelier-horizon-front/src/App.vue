<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { AppHeader, AppFooter } from '@/components/layout'
import DemoNoticeModal from '@/components/DemoNoticeModal.vue'
import { useSeoStore } from '@/stores'

const router = useRouter()
const seoStore = useSeoStore()
const { global: globalSettings, seo } = storeToRefs(seoStore)

const handleNavigate = (page: string) => router.push(page)

const setMetaTag = (attribute: 'name' | 'property', key: string, content?: string) => {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!content) {
    meta?.remove()
    return
  }

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, key)
    document.head.appendChild(meta)
  }

  meta.content = content
}

const getAbsoluteMediaUrl = (url?: string) => {
  if (!url) return undefined
  if (/^(?:https?:)?\/\//i.test(url) || url.startsWith('data:')) return url

  const apiUrl = import.meta.env.VITE_API_URL
  if (!apiUrl) return url

  try {
    return new URL(url, new URL(apiUrl).origin).toString()
  } catch {
    return url
  }
}

const setFavicon = (url?: string) => {
  if (!url) return

  let favicon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]')

  if (!favicon) {
    favicon = document.createElement('link')
    favicon.rel = 'icon'
    document.head.appendChild(favicon)
  }

  favicon.href = url
}

watch(
  [globalSettings, seo],
  ([globalValue, seoValue]) => {
    const siteName = globalValue?.siteName || 'Atelier Horizon'
    const title = seoValue?.metaTitle || siteName
    const description =
      globalValue?.siteDescription ||
      seoValue?.metaDescription ||
      'Atelier Horizon est un studio créatif spécialisé dans les services de conception et de développement.'
    const ogDescription = seoValue?.metaDescription || description
    const shareImage = getAbsoluteMediaUrl(seoValue?.shareImage?.url)

    document.title = title

    setMetaTag('name', 'description', description)
    setMetaTag('property', 'og:site_name', siteName)
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', ogDescription)
    setMetaTag('property', 'og:image', shareImage)
    setMetaTag('name', 'twitter:card', shareImage ? 'summary_large_image' : 'summary')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', ogDescription)
    setMetaTag('name', 'twitter:image', shareImage)
    setFavicon(getAbsoluteMediaUrl(globalValue?.favicon?.url))
  },
  { immediate: true },
)

void seoStore.fetch().catch(() => undefined)
</script>

<template>
  <DemoNoticeModal />
  <AppHeader :current-page="$route.path" :on-navigate="handleNavigate" />
  <main class="">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped></style>

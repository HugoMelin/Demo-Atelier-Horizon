import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSeo } from '@/composables/useSeo'
import type { Global } from '@/types'

export const useSeoStore = defineStore('seo', () => {
  const global = ref<Global | null>(null)
  const seo = computed(() => global.value?.defaultSeo ?? null)
  const siteName = computed(() => global.value?.siteName ?? null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchGlobal } = useSeo()

  async function fetch() {
    loading.value = true
    error.value = null

    try {
      global.value = await fetchGlobal()
      return global.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return { global, seo, siteName, loading, error, fetch }
})

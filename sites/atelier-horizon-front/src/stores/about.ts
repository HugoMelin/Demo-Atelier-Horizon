import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAbout } from '@/composables/useAbout'
import type { AboutCollectionResponse, AboutSingleResponse } from '@/types'

export const useAboutStore = defineStore('about', () => {
  const items = ref<AboutCollectionResponse | null>(null)
  const item = ref<AboutSingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllAbout, fetchAboutById } = useAbout()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllAbout()
      return items.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id: number) {
    loading.value = true
    error.value = null

    try {
      item.value = await fetchAboutById(id)
      return item.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return { items, item, loading, error, fetchAll, fetchById }
})

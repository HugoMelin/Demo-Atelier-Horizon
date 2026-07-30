import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useMethodology } from '@/composables/useMethodology'
import type { MethodologyCollectionResponse, MethodologySingleResponse } from '@/types'

export const useMethodologyStore = defineStore('methodology', () => {
  const items = ref<MethodologyCollectionResponse | null>(null)
  const item = ref<MethodologySingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllMethodologies, fetchMethodologyById } = useMethodology()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllMethodologies()
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
      item.value = await fetchMethodologyById(id)
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

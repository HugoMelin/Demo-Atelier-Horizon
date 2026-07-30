import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useService } from '@/composables/useService'
import type { ServiceCollectionResponse, ServiceSingleResponse } from '@/types'

export const useServiceStore = defineStore('service', () => {
  const items = ref<ServiceCollectionResponse | null>(null)
  const item = ref<ServiceSingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllServices, fetchServiceById } = useService()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllServices()
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
      item.value = await fetchServiceById(id)
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

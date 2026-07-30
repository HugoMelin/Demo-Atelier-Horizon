import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { useInfo } from '@/composables/useInfo'
import type { InfoCollectionResponse, InfoSingleResponse } from '@/types'

export const useInfoStore = defineStore('info', () => {
  const items = ref<InfoCollectionResponse | null>(null)
  const item = ref<InfoSingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllInfo, fetchInfoById } = useInfo()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllInfo()
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
      item.value = await fetchInfoById(id)
      return item.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
      fetchAll()
    });

  return { items, item, loading, error, fetchAll, fetchById }
})

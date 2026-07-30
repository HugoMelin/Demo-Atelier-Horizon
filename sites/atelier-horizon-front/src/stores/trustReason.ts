import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { useTrustReason } from '@/composables/useTrustReason'
import type { TrustReasonCollectionResponse, TrustReasonSingleResponse } from '@/types'

export const useTrustReasonStore = defineStore('trustReason', () => {
  const items = ref<TrustReasonCollectionResponse | null>(null)
  const item = ref<TrustReasonSingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllTrustReasons, fetchTrustReasonById } = useTrustReason()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllTrustReasons()
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
      item.value = await fetchTrustReasonById(id)
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

import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { usePrinciple } from '@/composables/usePrinciple'
import type { PrincipleCollectionResponse, PrincipleSingleResponse } from '@/types'

export const usePrincipleStore = defineStore('principle', () => {
  const items = ref<PrincipleCollectionResponse | null>(null)
  const item = ref<PrincipleSingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllPrinciples, fetchPrincipleById } = usePrinciple()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllPrinciples()
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
      item.value = await fetchPrincipleById(id)
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

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFaq } from '@/composables/useFaq'
import type { FaqSingleResponse } from '@/types'

export const useFaqStore = defineStore('faq', () => {
  const items = ref<FaqSingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllFaq } = useFaq()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllFaq()
      return items.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, fetchAll }
})

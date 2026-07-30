import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { useJourney } from '@/composables/useJourney'
import type { JourneyCollectionResponse, JourneySingleResponse } from '@/types'

export const useJourneyStore = defineStore('journey', () => {
  const items = ref<JourneyCollectionResponse | null>(null)
  const item = ref<JourneySingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllJourneys, fetchJourneyById } = useJourney()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllJourneys()
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
      item.value = await fetchJourneyById(id)
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

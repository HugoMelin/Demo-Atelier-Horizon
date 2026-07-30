import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { useTestimonial } from '@/composables/useTestimonial'
import type { TestimonialCollectionResponse, TestimonialSingleResponse } from '@/types'

export const useTestimonialStore = defineStore('testimonial', () => {
  const items = ref<TestimonialCollectionResponse | null>(null)
  const item = ref<TestimonialSingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllTestimonials, fetchTestimonialById } = useTestimonial()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllTestimonials()
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
      item.value = await fetchTestimonialById(id)
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

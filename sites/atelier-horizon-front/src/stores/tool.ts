import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { useTool } from '@/composables/useTool'
import type { ToolSingleResponse } from '@/types'

export const useToolStore = defineStore('tool', () => {
  const items = ref<ToolSingleResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchAllTools } = useTool()

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      items.value = await fetchAllTools()
      return items.value
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

  return { items, loading, error, fetchAll }
})

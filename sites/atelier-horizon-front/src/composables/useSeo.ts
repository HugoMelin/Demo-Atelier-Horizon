import type { Global, GlobalSingleResponse, SeoBlock } from '@/types'

export const useSeo = () => {
  const fetchGlobal = async (): Promise<Global> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/global?populate[defaultSeo][populate]=shareImage&populate[favicon]=true`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch SEO data: ${response.statusText}`)
      }

      const { data }: GlobalSingleResponse = await response.json()

      return data
    } catch (error) {
      throw new Error(`Failed to fetch SEO data: ${error}`)
    }
  }

  const fetchSeo = async (): Promise<SeoBlock | null> => {
    const global = await fetchGlobal()

    return global.defaultSeo
  }

  return {
    fetchGlobal,
    fetchSeo,
  }
}

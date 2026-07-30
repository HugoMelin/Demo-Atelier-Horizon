import type { StrapiMedia } from './strapi'

export interface SeoBlock {
  id: number
  metaTitle: string
  metaDescription: string
  shareImage?: StrapiMedia | null
}

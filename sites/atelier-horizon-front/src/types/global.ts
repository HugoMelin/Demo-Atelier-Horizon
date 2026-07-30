import type { SeoBlock } from './seo'
import type { StrapiMedia, StrapiSingleResponse } from './strapi'

export interface Global {
  id: number
  documentId: string
  siteName: string
  favicon?: StrapiMedia | null
  siteDescription: string
  defaultSeo: SeoBlock | null
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export type GlobalSingleResponse = StrapiSingleResponse<Global>

import type { IconBlock } from './icon'
import type { StrapiCollectionResponse, StrapiSingleResponse } from './strapi'

export interface Info {
  id: number
  documentId: string
  Ordre: number | null
  Label: string
  Valeur: string
  Lien: string | null
  Icon: IconBlock | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type InfoCollectionResponse = StrapiCollectionResponse<Info>
export type InfoSingleResponse = StrapiSingleResponse<Info>

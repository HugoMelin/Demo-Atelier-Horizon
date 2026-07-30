import type { IconBlock } from './icon'
import type { StrapiCollectionResponse, StrapiSingleResponse } from './strapi'

export interface TrustReason {
  id: number
  documentId: string
  Icon: IconBlock | null
  Ordre: number
  Description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type TrustReasonCollectionResponse = StrapiCollectionResponse<TrustReason>
export type TrustReasonSingleResponse = StrapiSingleResponse<TrustReason>

import type { IconBlock } from './icon'
import type { RichTextBlock } from './richText'
import type { StrapiCollectionResponse, StrapiSingleResponse } from './strapi'

export interface About {
  id: number
  documentId: string
  Order: number
  Title: string
  Description: RichTextBlock[]
  Icon: IconBlock | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type AboutCollectionResponse = StrapiCollectionResponse<About>
export type AboutSingleResponse = StrapiSingleResponse<About>

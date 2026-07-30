import type { IconBlock } from './icon'
import type { RichTextBlock } from './richText'
import type { StrapiCollectionResponse, StrapiSingleResponse } from './strapi'

export interface Principle {
  id: number
  documentId: string
  Icon: IconBlock | null
  Titre: string
  Description: RichTextBlock[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type PrincipleCollectionResponse = StrapiCollectionResponse<Principle>
export type PrincipleSingleResponse = StrapiSingleResponse<Principle>

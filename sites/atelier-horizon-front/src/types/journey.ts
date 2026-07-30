import type { RichTextBlock } from './richText'
import type { StrapiCollectionResponse, StrapiSingleResponse } from './strapi'

export interface Journey {
  id: number
  documentId: string
  Ordre: number | null
  Annee: string
  Titre: string
  Description: RichTextBlock[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type JourneyCollectionResponse = StrapiCollectionResponse<Journey>
export type JourneySingleResponse = StrapiSingleResponse<Journey>

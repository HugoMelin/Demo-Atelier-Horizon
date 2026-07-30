import type { RichTextBlock } from './richText'
import type { StrapiSingleResponse } from './strapi'

export interface FaqQuestion {
  id: number
  Question: string
  Reponse: RichTextBlock[]
}

export interface Faq {
  id: number
  documentId: string
  Question: FaqQuestion[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type FaqSingleResponse = StrapiSingleResponse<Faq>

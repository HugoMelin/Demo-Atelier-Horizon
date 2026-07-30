import type { RichTextBlock } from './richText'
import type { StrapiCollectionResponse, StrapiSingleResponse } from './strapi'

export interface Testimonial {
  id: number
  documentId: string
  Nom: string
  Role: string | null
  Contenu: RichTextBlock[]
  Note: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type TestimonialCollectionResponse = StrapiCollectionResponse<Testimonial>
export type TestimonialSingleResponse = StrapiSingleResponse<Testimonial>

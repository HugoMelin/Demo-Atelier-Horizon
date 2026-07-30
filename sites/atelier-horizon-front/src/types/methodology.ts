import type { IconBlock } from './icon'
import type { ListTextBlock } from './listText'
import type { RichTextBlock } from './richText'
import type { StrapiCollectionResponse, StrapiSingleResponse } from './strapi'

export interface Methodology {
  id: number
  documentId: string
  Ordre: number | null
  Icon: IconBlock | null
  Titre: string
  Soustitre: string | null
  Description: RichTextBlock[]
  Details: ListTextBlock[]
  Livrable: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type MethodologyCollectionResponse = StrapiCollectionResponse<Methodology>
export type MethodologySingleResponse = StrapiSingleResponse<Methodology>

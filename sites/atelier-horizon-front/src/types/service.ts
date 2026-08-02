import type { IconBlock } from './icon'
import type { ListTextBlock } from './listText'
import type { RichTextBlock } from './richText'
import type { StrapiCollectionResponse, StrapiSingleResponse } from './strapi'

export interface Service {
  id: number
  documentId: string
  Ordre: number | null
  Icon: IconBlock | null
  Titre: string
  Sous_titre: string | null
  Prix: string
  Duree: string | null
  Probleme: string | null
  Description: RichTextBlock[]
  Benefits: ListTextBlock[]
  Format: ListTextBlock[]
  Pour_qui: string | null
  Mis_en_avant: boolean | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type ServiceCollectionResponse = StrapiCollectionResponse<Service>
export type ServiceSingleResponse = StrapiSingleResponse<Service>

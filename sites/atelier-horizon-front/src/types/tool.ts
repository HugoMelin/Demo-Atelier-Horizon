import type { IconBlock } from './icon'
import type { StrapiSingleResponse } from './strapi'

export interface ToolItem {
  id: number
  Icon: IconBlock | null
  Titre: string
  Description: string | null
}

export interface Tool {
  id: number
  documentId: string
  Outils: ToolItem[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type ToolSingleResponse = StrapiSingleResponse<Tool>

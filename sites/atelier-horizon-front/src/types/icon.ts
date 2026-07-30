import type { StrapiMedia } from './strapi'

export interface IconBlock {
  id: number
  Image?: StrapiMedia | null
  Lucid: string | null
}

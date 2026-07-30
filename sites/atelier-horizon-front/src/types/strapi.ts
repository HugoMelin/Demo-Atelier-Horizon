export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiCollectionResponse<T> {
  data: T[]
  meta: {
    pagination: StrapiPagination
  }
}

export interface StrapiSingleResponse<T> {
  data: T
  meta: Record<string, unknown>
}

export interface StrapiMedia {
  id: number
  documentId?: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats?: Record<string, unknown> | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface Book {
  id: string
  title: string
  author: string
  category: string
  pages: number
  publishedYear: number
  coverImage: string
  synopsis: string
  pdfUrl: string
  rating: number
  isbn: string
}

export interface BookFilters {
  searchTerm: string
  category: string
}

// Strapi Response Types
export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiMeta {
  pagination: StrapiPagination
}

export interface StrapiResponse<T> {
  data: T
  meta: StrapiMeta
}

export interface StrapiMediaFormat {
  url: string
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
}

export interface StrapiMedia {
  id: number
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    large?: StrapiMediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  createdAt: string
  updatedAt: string
}

export interface StrapiAuthor {
  id: number
  documentId: string
  name: string
  bio: string | null
  photo?: StrapiMedia
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface StrapiBook {
  id: number
  documentId: string
  title: string
  categories: string[]
  summary: string
  pages_count: number
  publish_date: string
  display_date: string | null
  slug: string
  author?: StrapiAuthor
  cover_image?: StrapiMedia
  pdf_file?: StrapiMedia
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface StrapiPage {
  id: number
  documentId: string
  key: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

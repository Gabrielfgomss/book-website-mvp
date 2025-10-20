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

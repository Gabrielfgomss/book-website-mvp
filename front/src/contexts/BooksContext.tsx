import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { Book, BookFilters } from "@/types/book"
import { booksService, type PaginationOptions } from "@/services/booksService"

interface BooksContextType {
  books: Book[]
  filteredBooks: Book[]
  categories: string[]
  filters: BookFilters
  isLoading: boolean
  error: string | null
  currentPage: number
  itemsPerPage: 10 | 20 | 50 | 100
  setFilters: (filters: Partial<BookFilters>) => void
  refreshBooks: () => Promise<void>
  setPage: (page: number) => void
  setItemsPerPage: (items: 10 | 20 | 50 | 100) => void
}

const BooksContext = createContext<BooksContextType | undefined>(undefined)

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [filters, setFiltersState] = useState<BookFilters>({
    searchTerm: "",
    category: "all",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<10 | 20 | 50 | 100>(20)

  const loadBooks = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const paginationOptions: PaginationOptions = {
        page: currentPage,
        limit: itemsPerPage,
      }
      const [booksData, categoriesData] = await Promise.all([
        booksService.getBooks(paginationOptions),
        booksService.getCategories(),
      ])
      setBooks(booksData)
      setFilteredBooks(booksData)
      setCategories(categoriesData)
    } catch (err) {
      setError("Erro ao carregar livros. Tente novamente mais tarde.")
      console.error("Error loading books:", err)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  useEffect(() => {
    const applyFilters = async () => {
      try {
        const results = await booksService.searchBooks(filters.searchTerm, filters.category)
        setFilteredBooks(results)
      } catch (err) {
        console.error("Error filtering books:", err)
      }
    }

    applyFilters()
  }, [filters])

  const setFilters = useCallback((newFilters: Partial<BookFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }))
  }, [])

  const refreshBooks = useCallback(async () => {
    await loadBooks()
  }, [loadBooks])

  const setPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleSetItemsPerPage = useCallback((items: 10 | 20 | 50 | 100) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }, [])

  return (
    <BooksContext.Provider
      value={{
        books,
        filteredBooks,
        categories,
        filters,
        isLoading,
        error,
        currentPage,
        itemsPerPage,
        setFilters,
        refreshBooks,
        setPage,
        setItemsPerPage: handleSetItemsPerPage,
      }}
    >
      {children}
    </BooksContext.Provider>
  )
}

export const useBooks = () => {
  const context = useContext(BooksContext)
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider")
  }
  return context
}

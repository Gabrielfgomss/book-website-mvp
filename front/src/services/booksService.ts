import type { Book, StrapiResponse, StrapiBook, StrapiPage } from '@/types/book'

// Strapi API base URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api'

// Helper para construir URL com query params
const buildUrl = (endpoint: string, params: Record<string, any> = {}) => {
  const url = new URL(`${API_URL}${endpoint}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  })
  return url.toString()
}

// Mapear dados do Strapi para nosso tipo Book
const mapStrapiBookToBook = (strapiBook: StrapiBook): Book => {
  const baseUrl = API_URL.replace('/api', '')
  
  return {
    id: strapiBook.documentId || String(strapiBook.id),
    title: strapiBook.title || 'Sem Título',
    author: strapiBook.author?.name || 'Autor Desconhecido',
    category: strapiBook.categories?.[0] || 'Geral',
    pages: strapiBook.pages_count || 0,
    publishedYear: strapiBook.publish_date 
      ? new Date(strapiBook.publish_date).getFullYear() 
      : new Date().getFullYear(),
    coverImage: strapiBook.cover_image?.url 
      ? `${baseUrl}${strapiBook.cover_image.url}`
      : 'https://via.placeholder.com/200x300?text=Sem+Capa',
    synopsis: strapiBook.summary || `"${strapiBook.title}" é uma obra fascinante.`,
    pdfUrl: strapiBook.pdf_file?.url 
      ? `${baseUrl}${strapiBook.pdf_file.url}`
      : '',
    rating: Number((Math.random() * 2 + 3).toFixed(1)), // Mock rating por enquanto
    isbn: strapiBook.slug || '',
  }
}

// Interceptor de erros global
const handleApiError = (error: any, fallbackMessage: string) => {
  console.error('API Error:', error)
  
  if (error.response) {
    // Erro da API
    const status = error.response.status
    const message = error.response.data?.error?.message || fallbackMessage
    
    if (status === 401) {
      throw new Error('Não autorizado. Verifique suas credenciais.')
    } else if (status === 403) {
      throw new Error('Acesso negado.')
    } else if (status === 404) {
      throw new Error('Recurso não encontrado.')
    } else if (status >= 500) {
      throw new Error('Erro no servidor. Tente novamente mais tarde.')
    }
    
    throw new Error(message)
  } else if (error.request) {
    // Requisição foi feita mas sem resposta
    throw new Error('Servidor não está respondendo. Verifique sua conexão.')
  } else {
    // Erro ao configurar a requisição
    throw new Error(fallbackMessage)
  }
}

// Retry logic - 3 tentativas
const fetchWithRetry = async (url: string, options: RequestInit = {}, retries = 3): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      
      if (!response.ok && i < retries - 1) {
        // Tentar novamente se não for a última tentativa
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))) // Backoff exponencial
        continue
      }
      
      return response
    } catch (error) {
      if (i === retries - 1) {
        throw error
      }
      // Aguardar antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
  
  throw new Error('Falha após múltiplas tentativas')
}

export type PaginationOptions = {
  page?: number
  limit?: 10 | 20 | 50 | 100
}

export const booksService = {
  /**
   * Busca livros da API Strapi com paginação
   * @param options - Opções de paginação { page: número da página (padrão 1), limit: itens por página (padrão 20) }
   * @returns Promise com array de livros e metadata de paginação
   */
  async getBooks(options: PaginationOptions = {}): Promise<Book[]> {
    const { page = 1, limit = 20 } = options

    try {
      const url = buildUrl('/books', {
        'pagination[page]': page,
        'pagination[pageSize]': limit,
        'populate': '*',
        'sort': 'createdAt:desc'
      })

      const response = await fetchWithRetry(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: StrapiResponse<StrapiBook[]> = await response.json()

      if (result.data && result.data.length > 0) {
        return result.data.map(mapStrapiBookToBook)
      }

      return []
    } catch (error) {
      handleApiError(error, 'Erro ao buscar livros')
      return []
    }
  },

  /**
   * Busca detalhes de um livro específico por ID
   * @param id - ID do livro (documentId do Strapi)
   * @returns Promise com o livro ou null
   */
  async getBookById(id: string): Promise<Book | null> {
    try {
      const url = buildUrl(`/books/${id}`, {
        'populate': '*'
      })

      const response = await fetchWithRetry(url)

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: StrapiResponse<StrapiBook> = await response.json()

      if (result.data) {
        return mapStrapiBookToBook(result.data)
      }

      return null
    } catch (error) {
      handleApiError(error, 'Erro ao buscar detalhes do livro')
      return null
    }
  },

  /**
   * Busca livros com filtros de texto e categoria
   * @param searchTerm - Termo de busca para título ou autor
   * @param category - Categoria para filtrar
   * @returns Promise com array de livros filtrados
   */
  async searchBooks(searchTerm: string, category?: string): Promise<Book[]> {
    try {
      const params: Record<string, any> = {
        'populate': '*',
        'pagination[pageSize]': 100
      }

      // Só adiciona filtros se houver termo de busca ou categoria
      if (searchTerm || (category && category !== 'all')) {
        const filters: Record<string, any> = {}

        if (searchTerm) {
          filters['$or'] = [
            { title: { $containsi: searchTerm } },
            { 'author.name': { $containsi: searchTerm } }
          ]
        }

        if (category && category !== 'all') {
          filters['categories'] = { $contains: category }
        }

        params['filters'] = JSON.stringify(filters)
      }

      const url = buildUrl('/books', params)

      const response = await fetchWithRetry(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: StrapiResponse<StrapiBook[]> = await response.json()

      if (result.data && result.data.length > 0) {
        return result.data.map(mapStrapiBookToBook)
      }

      return []
    } catch (error) {
      handleApiError(error, 'Erro ao buscar livros')
      return []
    }
  },

  /**
   * Busca todas as categorias únicas de livros
   * @returns Promise com array de categorias
   */
  async getCategories(): Promise<string[]> {
    try {
      const url = buildUrl('/books', {
        'fields': 'categories',
        'pagination[pageSize]': 100
      })

      const response = await fetchWithRetry(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: StrapiResponse<StrapiBook[]> = await response.json()

      if (result.data && result.data.length > 0) {
        const categoriesSet = new Set<string>()
        
        result.data.forEach(book => {
          if (book.categories && Array.isArray(book.categories)) {
            book.categories.forEach(cat => categoriesSet.add(cat))
          }
        })

        return Array.from(categoriesSet).sort()
      }

      return []
    } catch (error) {
      handleApiError(error, 'Erro ao buscar categorias')
      return []
    }
  },

  /**
   * Busca páginas estáticas (Home, Sobre, Contato)
   * @param key - Chave da página (home, about, contact)
   * @returns Promise com conteúdo da página
   */
  async getPage(key: string): Promise<StrapiPage | null> {
    try {
      const url = buildUrl('/pages', {
        'filters[key][$eq]': key
      })

      const response = await fetchWithRetry(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: StrapiResponse<StrapiPage[]> = await response.json()

      if (result.data && result.data.length > 0) {
        return result.data[0]
      }

      return null
    } catch (error) {
      handleApiError(error, 'Erro ao buscar página')
      return null
    }
  },
}
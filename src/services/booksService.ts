import type { Book } from '@/types/book'
import booksData from '@/data/books.json'

const simulateNetworkDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms))

// Open Library API base URL
const OPEN_LIBRARY_API = 'https://openlibrary.org'

// Mapear dados da Open Library para nosso tipo Book
const mapOpenLibraryToBook = (doc: any, index: number): Book => {
  const coverUrl = doc.cover_i
    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
    : 'https://via.placeholder.com/200x300?text=Sem+Capa'

  return {
    id: doc.key?.replace('/works/', '') || `book-${index}`,
    title: doc.title || 'Sem Título',
    author: doc.author_name?.[0] || 'Autor Desconhecido',
    category: doc.subject?.[0] || 'Geral',
    pages: doc.number_of_pages_median || Math.floor(Math.random() * 400) + 100,
    publishedYear: doc.first_publish_year || new Date().getFullYear(),
    coverImage: coverUrl,
    synopsis: doc.first_sentence?.[0] || `"${doc.title}" é uma obra fascinante que oferece uma exploração única de seus temas.`,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
    isbn: doc.isbn?.[0] || '',
  }
}

export type PaginationOptions = {
  page?: number
  limit?: 10 | 20 | 50 | 100
}

export const booksService = {
  /**
   * Busca livros da Open Library API com paginação
   * @param options - Opções de paginação { page: número da página (padrão 1), limit: itens por página (padrão 20) }
   * @returns Promise com array de livros
   */
  async getBooks(options: PaginationOptions = {}): Promise<Book[]> {
    const { page = 1, limit = 20 } = options

    try {
      // Calcula o offset para paginação
      const offset = (page - 1) * limit

      // Busca livros populares de programação/tecnologia
      const response = await fetch(
        `${OPEN_LIBRARY_API}/search.json?q=subject:programming&limit=${limit}&offset=${offset}&sort=new`
      )

      if (!response.ok) {
        throw new Error('Falha ao buscar da Open Library API')
      }

      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        return data.docs.map((doc: any, index: number) => mapOpenLibraryToBook(doc, index))
      }

      // Se não houver resultados, retorna dados locais
      console.warn('Nenhum resultado da API, usando dados locais')
      return booksData.slice(0, limit) as Book[]
    } catch (error) {
      console.error('Erro ao buscar livros da API:', error)
      // Fallback para dados locais em caso de erro
      await simulateNetworkDelay()
      return booksData.slice(0, limit) as Book[]
    }
  },

  /**
   * Busca detalhes de um livro específico por ID
   * Tenta buscar da API Works e Read API para verificar disponibilidade de PDF
   * @param id - ID do livro (Works ID sem o prefixo /works/)
   * @returns Promise com o livro ou null
   */
  async getBookById(id: string): Promise<Book | null> {
    try {
      // 1. Buscar detalhes do Work na API
      const workResponse = await fetch(`${OPEN_LIBRARY_API}/works/${id}.json`)
      
      if (!workResponse.ok) {
        throw new Error('Work não encontrado')
      }

      const workData = await workResponse.json()

      // 2. Buscar edições para pegar ISBN e mais detalhes
      const editionsResponse = await fetch(`${OPEN_LIBRARY_API}/works/${id}/editions.json?limit=1`)
      const editionsData = await editionsResponse.json()
      const firstEdition = editionsData.entries?.[0]

      // 3. Verificar se há versão legível disponível usando Read API
      let pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      let readableStatus = 'noview'

      if (firstEdition?.isbn_13?.[0] || firstEdition?.isbn_10?.[0]) {
        const isbn = firstEdition.isbn_13?.[0] || firstEdition.isbn_10?.[0]
        try {
          const readApiResponse = await fetch(
            `${OPEN_LIBRARY_API}/api/volumes/brief/isbn/${isbn}.json`
          )
          if (readApiResponse.ok) {
            const readApiData = await readApiResponse.json()
            const items = readApiData.items || []
            if (items.length > 0 && items[0].itemURL) {
              // Se houver URL do archive.org, usar ela
              if (items[0].itemURL.includes('archive.org')) {
                pdfUrl = items[0].itemURL
                readableStatus = items[0].status || 'full access'
              }
            }
          }
        } catch (readApiError) {
          console.warn('Erro ao buscar Read API:', readApiError)
        }
      }

      // 4. Pegar capa do livro
      const coverId = firstEdition?.covers?.[0] || workData.covers?.[0]
      const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : 'https://via.placeholder.com/400x600?text=Sem+Capa'

      // 5. Montar objeto Book
      const book: Book = {
        id: id,
        title: workData.title || 'Sem Título',
        author: workData.authors?.[0]?.author?.key 
          ? await this.getAuthorName(workData.authors[0].author.key)
          : 'Autor Desconhecido',
        category: workData.subjects?.[0] || 'Geral',
        pages: firstEdition?.number_of_pages || Math.floor(Math.random() * 400) + 100,
        publishedYear: firstEdition?.publish_date 
          ? parseInt(firstEdition.publish_date) || new Date().getFullYear()
          : new Date().getFullYear(),
        coverImage: coverUrl,
        synopsis: typeof workData.description === 'string' 
          ? workData.description 
          : workData.description?.value || `Uma obra fascinante sobre ${workData.title}.`,
        pdfUrl: pdfUrl,
        rating: Number((Math.random() * 2 + 3).toFixed(1)),
        isbn: firstEdition?.isbn_13?.[0] || firstEdition?.isbn_10?.[0] || '',
      }

      return book
    } catch (error) {
      console.error('Erro ao buscar detalhes do livro da API:', error)
      // Fallback para dados locais
      await simulateNetworkDelay()
      const book = booksData.find((book) => book.id === id)
      return book ? (book as Book) : null
    }
  },

  /**
   * Busca o nome de um autor pela chave
   * @param authorKey - Chave do autor (ex: /authors/OL123A)
   * @returns Nome do autor
   */
  async getAuthorName(authorKey: string): Promise<string> {
    try {
      const response = await fetch(`${OPEN_LIBRARY_API}${authorKey}.json`)
      if (response.ok) {
        const data = await response.json()
        return data.name || 'Autor Desconhecido'
      }
    } catch (error) {
      console.warn('Erro ao buscar autor:', error)
    }
    return 'Autor Desconhecido'
  },

  async searchBooks(searchTerm: string, category?: string): Promise<Book[]> {
    await simulateNetworkDelay(500)
    let results = booksData as Book[]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
      )
    }

    if (category && category !== 'all') {
      results = results.filter((book) => book.category === category)
    }

    return results
  },

  async getCategories(): Promise<string[]> {
    await simulateNetworkDelay(300)
    const categories = [...new Set(booksData.map((book) => book.category))]
    return categories.sort()
  },
}
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import type { Book } from "@/types/book"
import { booksService } from "@/services/booksService"
import { BookInfo } from "@/components/BookInfo"
import { PDFViewer } from "@/components/PDFViewer"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle } from "lucide-react"

export const BookDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBook = async () => {
      if (!id) {
        setError("ID do livro não fornecido")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const bookData = await booksService.getBookById(id)

        if (!bookData) {
          setError("Livro não encontrado")
        } else {
          setBook(bookData)
        }
      } catch (err) {
        setError("Erro ao carregar detalhes do livro")
        console.error("Error loading book:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadBook()
  }, [id])

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-10 w-32 mb-6" />
        <div className="space-y-6">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error || "Livro não encontrado"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link to="/" className="mb-6 inline-block">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Catálogo
          </Button>
        </Link>
      </motion.div>

      <div className="space-y-8">
        <BookInfo book={book} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Ler Online</h2>
          <PDFViewer pdfUrl={book.pdfUrl} title={book.title} />
        </motion.div>
      </div>
    </div>
  )
}

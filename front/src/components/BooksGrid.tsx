import { useBooks } from "@/contexts/BooksContext"
import { BookCard } from "./BookCard"
import { BookCardSkeleton } from "./BookCardSkeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, BookX } from "lucide-react"

export const BooksGrid = () => {
  const { filteredBooks, isLoading, error } = useBooks()

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookX className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Nenhum livro encontrado</h3>
        <p className="text-muted-foreground max-w-md">
          Não encontramos livros que correspondam aos seus critérios de busca. Tente ajustar os filtros ou buscar por
          outros termos.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredBooks.map((book, index) => (
        <BookCard key={book.id} book={book} index={index} />
      ))}
    </div>
  )
}

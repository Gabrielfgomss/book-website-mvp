import { motion } from "framer-motion"
import type { Book } from "@/types/book"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Calendar, Hash, User } from "lucide-react"
import { formatYear } from "@/utils/formatters"

interface BookInfoProps {
  book: Book
}

export const BookInfo = ({ book }: BookInfoProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 flex-shrink-0">
              <img
                src={book.coverImage || "/placeholder.svg"}
                alt={`Capa do livro ${book.title}`}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <Badge className="mb-3">{book.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{book.title}</h1>
                <div className="flex items-center gap-2 text-lg text-muted-foreground">
                  <User className="h-5 w-5" />
                  <span>{book.author}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">{book.displayDate}</span>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Páginas</p>
                    <p className="font-medium">{book.pages}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Publicação</p>
                    <p className="font-medium">{formatYear(book.publishedYear)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">ISBN</p>
                    <p className="font-medium text-sm">{book.isbn}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h2 className="text-xl font-semibold mb-3">Sinopse</h2>
                <p className="text-muted-foreground leading-relaxed">{book.synopsis}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

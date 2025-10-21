import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import type { Book as BookType } from "@/types/book"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, User } from "lucide-react"
import { formatPages, truncateText } from "@/utils/formatters"

interface BookCardProps {
  book: BookType
  index?: number
}

export const BookCard = ({ book, index = 0 }: BookCardProps) => {
  return (
    <Link to={`/livro/${book.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="cursor-pointer h-full"
      >
        <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={book.coverImage || "/placeholder.svg"}
            alt={`Capa do livro ${book.title}`}
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
          />
          <Badge className="absolute top-2 right-2">{book.category}</Badge>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-balance">{book.title}</h3>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <User className="h-4 w-4" />
            <span>{book.author}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{truncateText(book.synopsis, 120)}</p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{book.displayDate}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{formatPages(book.pages)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full">Ver Detalhes</Button>
        </CardFooter>
      </Card>
    </motion.div>
    </Link>
  )
}

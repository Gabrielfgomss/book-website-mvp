import { motion } from "framer-motion"
import { FilterBar } from "@/components/FilterBar"
import { BooksGrid } from "@/components/BooksGrid"
import { Pagination } from "@/components/Pagination"
import { useBooks } from "@/contexts/BooksContext"

export const Home = () => {
  const { filteredBooks, currentPage, itemsPerPage, setPage, setItemsPerPage, isLoading } = useBooks()

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Descubra Obras Autorais</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Explore nossa coleção de livros cuidadosamente selecionados. Encontre sua próxima leitura favorita.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <FilterBar />
      </motion.div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredBooks.length} {filteredBooks.length === 1 ? "livro encontrado" : "livros encontrados"}
        </p>
      </div>

      <BooksGrid />

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setPage}
        onItemsPerPageChange={setItemsPerPage}
        isLoading={isLoading}
      />
    </div>
  )
}

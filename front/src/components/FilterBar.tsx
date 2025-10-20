import { SearchBar } from "./SearchBar"
import { CategoryFilter } from "./CategoryFilter"
import { Button } from "@/components/ui/button"
import { useBooks } from "@/contexts/BooksContext"
import { X } from "lucide-react"

export const FilterBar = () => {
  const { filters, setFilters } = useBooks()

  const hasActiveFilters = filters.searchTerm !== "" || filters.category !== "all"

  const clearFilters = () => {
    setFilters({ searchTerm: "", category: "all" })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar />
        <CategoryFilter />
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="md:w-auto bg-transparent">
            <X className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <span className="text-muted-foreground">Filtros ativos:</span>
          {filters.searchTerm && (
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
              <span>Busca: "{filters.searchTerm}"</span>
              <button
                onClick={() => setFilters({ searchTerm: "" })}
                className="hover:bg-primary/20 rounded-full p-0.5"
                aria-label="Remover filtro de busca"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.category !== "all" && (
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
              <span>Categoria: {filters.category}</span>
              <button
                onClick={() => setFilters({ category: "all" })}
                className="hover:bg-primary/20 rounded-full p-0.5"
                aria-label="Remover filtro de categoria"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

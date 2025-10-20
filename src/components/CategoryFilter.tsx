import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBooks } from "@/contexts/BooksContext"

export const CategoryFilter = () => {
  const { categories, filters, setFilters } = useBooks()

  const handleCategoryChange = (value: string) => {
    setFilters({ category: value })
  }

  return (
    <Select value={filters.category} onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue placeholder="Todas as categorias" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas as categorias</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

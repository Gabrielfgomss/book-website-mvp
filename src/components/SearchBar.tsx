import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useBooks } from "@/contexts/BooksContext"
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"

export const SearchBar = () => {
  const { filters, setFilters } = useBooks()
  const [localSearch, setLocalSearch] = useState(filters.searchTerm)
  const debouncedSearch = useDebounce(localSearch, 300)

  useEffect(() => {
    setFilters({ searchTerm: debouncedSearch })
  }, [debouncedSearch, setFilters])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
  }

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Buscar por título ou autor..."
        value={localSearch}
        onChange={handleSearch}
        className="pl-10"
      />
    </div>
  )
}

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNews } from "../../context/news-context"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const { setSearchTerm } = useNews()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(searchQuery)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for news..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}


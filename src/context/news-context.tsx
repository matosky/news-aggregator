import { createContext, useContext, useState, type ReactNode } from "react"

export interface NewsFilters {
  categories: string[]
  sources: string[]
  date?: Date
}

export interface NewsCategories {
  categories: {id: string, label: string}[]
}


export interface NewsContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: NewsFilters;
  setFilters: (filters: NewsFilters | ((prev: NewsFilters) => NewsFilters)) => void;
  newsCategories: NewsCategories;
  setNewsCategories: (newsCategories: NewsCategories | ((prev: NewsCategories) => NewsCategories)) => void;
}


const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [newsCategories, setNewsCategories] = useState<NewsCategories>({
    categories: [
      { id: "business", label: "Business" },
      { id: "entertainment", label: "Entertainment" }
    ]
  })  
  const [filters, setFilters] = useState<NewsFilters>({
    categories: [],
    sources: [],
    date: undefined,
  })

  return (
    <NewsContext.Provider value={{ searchTerm, setSearchTerm, filters, setFilters, newsCategories, setNewsCategories  }}>{children}</NewsContext.Provider>
  )
}

export function useNewsContext() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider")
  }
  return context
}


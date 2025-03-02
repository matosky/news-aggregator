import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"
import { useNews as useNewsContext } from "../../context/news-context"
import { useUserPreferences } from "../../context/user-preferences-context"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"
import NewsCard from "./news-card"
import { useNews } from "../../hooks/use-news"
import LoadingNewsFeed from "./loading-news-feed"

const ITEMS_PER_PAGE = 10

export default function NewsFeed() {
  const { searchTerm, filters } = useNewsContext()
  const { preferences } = useUserPreferences()
  const [page, setPage] = useState(1)

  const { articles, loading, error, updateParams } = useNews({
    searchTerm,
    filters,
    preferences,
  })

  useEffect(() => {
    updateParams({ searchTerm, filters, preferences })
  }, [searchTerm, filters, preferences, updateParams])


  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return <LoadingNewsFeed />
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No articles found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters to find more articles.</p>
      </div>
    )
  }

  const paginatedArticles = articles.slice(0, page * ITEMS_PER_PAGE)
  const hasMore = paginatedArticles.length < articles.length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {paginatedArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={() => setPage((prev) => prev + 1)} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}


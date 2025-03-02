import { Suspense } from "react"
import FilterPanel from "../components/common/filter-panel/filter-panel"
import SearchBar from "../components/common/search-bar"
import LoadingNewsFeed from "../components/common/loading-news-feed"
import NewsFeed from "../components/common/news-feed"

export const  Home = ()=> {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl bg-background text-foreground font-bold mb-8 text-center md:text-left">NewsHub</h1>

        <div className="mb-6">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <FilterPanel />
          </div>

          <div className="md:col-span-3">
            <Suspense fallback={<LoadingNewsFeed />}>
              <NewsFeed />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}


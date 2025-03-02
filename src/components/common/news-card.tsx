import { formatDistanceToNow } from "date-fns"
import { ExternalLink, Clock, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import type { Article } from "../../types/article"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

interface NewsCardProps {
  article: Article
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="flex flex-col h-[300px]">
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-2/5 h-40 md:h-auto relative bg-muted flex-shrink-0">
          {article.urlToImage ? (
            <img
              src={article.urlToImage || "/placeholder.svg"}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="md:w-3/5 flex flex-col p-4 overflow-hidden">
          <CardHeader className="p-0 mb-2">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{article.source.name}</Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </div>
            </div>
            <CardTitle className="line-clamp-2 text-2xl font-bold leading-tight">{article.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              {article.author && <span className="text-xs">By {article.author}</span>}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex-grow overflow-hidden">
            <p className="line-clamp-2 text-base">{article.description}</p>
          </CardContent>
        </div>
      </div>
      <CardFooter className="flex justify-between p-3 border-t mt-auto">
        <div className="flex space-x-2">
          {article.category && (
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs">
            Read More
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

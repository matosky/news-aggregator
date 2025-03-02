import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'; // Assuming your custom UI components are ported
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Article } from '../../types/article';



interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        {article.urlToImage && (
          <div className="md:w-1/3 h-[200px] md:h-auto relative">
            <img src={article.urlToImage || '/placeholder.svg'} alt={article.title} className="object-cover w-full h-full" />
          </div>
        )}
        <div className={`flex flex-col ${article.urlToImage ? 'md:w-2/3' : 'w-full'}`}>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{article.source.name}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </div>
            </div>
            <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            <CardDescription className="flex items-center">
              {article.author && <span>By {article.author}</span>}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3">{article.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between mt-auto">
            <div className="flex space-x-2">
              {article.category && <Badge variant="secondary">{article.category}</Badge>}
            </div>
            <Button variant="outline" size="sm">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Read More
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}



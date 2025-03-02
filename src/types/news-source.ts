// types/newsSource.ts
import { Article, NewsParams } from './article'; // Assuming NewsParams is defined in article.ts

export interface INewsSource {
  fetchArticles(params: NewsParams): Promise<Article[]>;
}

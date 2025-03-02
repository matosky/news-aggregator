// src/api/NewsAPI.ts
import { INewsSource } from "../types/news-source";  // Import the interface for consistency
import { NewsParams } from "../types/article";
import { Article } from "../types/article";  // Import the Article type

export class NewsAPI implements INewsSource {
  async fetchArticles(params: NewsParams): Promise<Article[]> {
    const apiKey = import.meta.env.VITE_NEWSAPI_KEY; // Ensure you have the API key in your environment variables
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.append("apiKey", apiKey!);
    url.searchParams.append("language", "en");
    url.searchParams.append("q", params.searchTerm || "general");

    if (params.filters.categories.length > 0) {
      url.searchParams.append("category", params.filters.categories.join(","));
    }
    if (params.filters.date) {
      url.searchParams.append("from", params.filters.date.toISOString());
      url.searchParams.append("to", params.filters.date.toISOString());
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    return data.articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      author: article.author,
      source: { id: "newsapi", name: "NewsAPI" },
      category: article.category || null,
    }));
  }
}

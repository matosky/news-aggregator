// src/api/NYTimes.ts
import { INewsSource } from "../types/news-source";
import { NewsParams } from "../types/article";
import { Article } from "../types/article";

export class NYTimes implements INewsSource {
  async fetchArticles(params: NewsParams): Promise<Article[]> {
    const apiKey = import.meta.env.VITE_NYT_API_KEY; // Ensure you have the NYTimes API key in your environment variables
    const url = new URL("https://api.nytimes.com/svc/topstories/v2/home.json");
    url.searchParams.append("api-key", apiKey!);

    // Apply category filter (section_name)
    if (params.filters.categories && params.filters.categories.length > 0) {
      url.searchParams.append("section", params.filters.categories.join(","));
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    // Apply client-side filters here (e.g., search term, date)
    let articles: Article[] = data.results.map((article: any) => ({
      id: article.url,
      title: article.title,
      // Explicit null check to ensure no 'null' is assigned to description
      description: article?.abstract !== null && article?.abstract !== undefined ? article.abstract : "No description available",  
      content: article.snippet,
      url: article.url,
      urlToImage: article.multimedia?.[0]?.url || null,
      publishedAt: article.published_date,
      author: article.byline.original || null,
      source: { id: "nytimes", name: "New York Times" },
      category: article.section.toLowerCase(),
    }));

    // Search term filter
    if (params.searchTerm) {
      const searchLower = params.searchTerm.toLowerCase();
      articles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchLower) ||
          article.description.toLowerCase().includes(searchLower) ||
          (article.author && article.author.toLowerCase().includes(searchLower))
      );
    }

    // Apply date filter (if `filters.date` is present in params)
    if (params.filters.date) {
      const filterDate = params.filters.date.toDateString();
      articles = articles.filter(
        (article) => new Date(article.publishedAt).toDateString() === filterDate
      );
    }

    return articles;
  }
}

// src/api/Guardian.ts
import { INewsSource } from "../types/news-source"; 
import { GuardianArticle, NewsParams } from "../types/article";
import { Article } from "../types/article";

export class Guardian implements INewsSource {
  async fetchArticles(params: NewsParams): Promise<Article[]> {
    const apiKey = import.meta.env.VITE_GUARDIAN_API_KEY; // Ensure you have the Guardian API key in your environment variables
    const url = new URL("https://content.guardianapis.com/search");
    url.searchParams.append("api-key", apiKey);
    url.searchParams.append("q", params.searchTerm || "");
    url.searchParams.append("format", "json");
    url.searchParams.append("show-tags", "contributor");
    url.searchParams.append("show-fields", "starRating,headline,thumbnail,short-url");

    if (params.filters.categories.length > 0) {
      url.searchParams.append("section", params.filters.categories.join("|"));
    }
    if (params.filters.date) {
      url.searchParams.append("from-date", params.filters.date.toISOString());
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    return data.response.results.map((article: GuardianArticle) => ({
      id: article.id,
      title: article.webTitle,
      description: article.webTitle,
      content: article.fields.bodyText,
      url: article.fields.shortUrl || article.webUrl,
      urlToImage: article.fields.thumbnail || null,
      publishedAt: article.webPublicationDate,
      author: article.tags.find((tag: any) => tag.type === "contributor")?.webTitle || "The Guardian",
      // author: article?.tags[0]?.webTitle,
      source: { id: "guardian", name: "The Guardian" },
      category: article.sectionName.toLowerCase(),
    }));
  }
}

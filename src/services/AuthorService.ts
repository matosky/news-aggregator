// src/services/AuthorService.ts
import { Guardian } from "../network/Guardian";
import { NewsAPI } from "../network/NewsAPI";
import { NYTimes } from "../network/NYTimes";
import { Article } from "../types/article"; // Assuming Article type is defined

export class AuthorService {
  private newsSources: { id: string, instance: any }[];
  constructor() {
    // Instantiate the sources
    this.newsSources = [
      { id: "newsapi", instance: new NewsAPI() },
      { id: "guardian", instance: new Guardian() },
      { id: "nytimes", instance: new NYTimes() },
    ];
  }

  async fetchAuthors(sources: string[], categories: string[]): Promise<{ id: string; label: string }[]> {
    const authorSet = new Set<string>();

    const fetchAuthorsFromSource = async (sourceId: string) => {
      const source = this.newsSources.find((source) => source.id === sourceId);
      if (source) {
        const articles = await source.instance.fetchArticles({
          searchTerm: "",
          filters: { categories, sources: [sourceId], date: undefined },
          preferences: { preferredSources: [], preferredCategories: [], preferredAuthors: [] },
        });
        articles.forEach((article: Article) => {
          if (article.author) authorSet.add(article.author);
        });
      }
    };

    const fetchAuthorsFromAllSources = async () => {
      const sourcePromises = sources.map((sourceId) => fetchAuthorsFromSource(sourceId));
      await Promise.allSettled(sourcePromises);
    };

    try {
      await fetchAuthorsFromAllSources();
    } catch (error) {
      console.error("Error fetching authors:", error);
    }

    return Array.from(authorSet).map((author) => ({ id: author, label: author }));
  }
}

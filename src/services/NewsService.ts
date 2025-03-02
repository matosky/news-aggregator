import { Article, NewsParams } from "../types/article";
import { INewsSource } from "../types/news-source";

export class NewsService {
  private newsSources: INewsSource[];

  constructor(newsSources: INewsSource[]) {
    this.newsSources = newsSources;
  }

  // Fetch articles from all sources
  async fetchAllNews(params: NewsParams): Promise<Article[]> {
    const results = await Promise.allSettled(
      this.newsSources.map((source) => source.fetchArticles(params))  // Fetch articles from all sources
    );

    let allArticles: Article[] = [];

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value);  // Add successfully fetched articles
      } else {
        console.error('API call failed:', result.reason);  // Log failed API call errors
      }
    });

    return allArticles;
  }

  // Filter articles based on multiple criteria
  filterArticles(articles: Article[], params: NewsParams): Article[] {
    let filtered = articles;

    console.log('Filters:', params.filters);


    // Apply search filter
    if (params.searchTerm) {
      filtered = this.filterBySearchTerm(filtered, params.searchTerm);
    }

    // Apply category filter
    if (params.filters.categories.length > 0) {
      filtered = this.filterByCategory(filtered, params.filters.categories);
    }

    // Apply source filter
    if (params.filters.sources.length > 0) {
      filtered = this.filterBySource(filtered, params.filters.sources);
    }

    // Apply date filter
    if (params.filters.date) {
      filtered = this.filterByDate(filtered, params.filters.date);
    }

    // Apply preferences (preferred sources and categories)
    filtered = this.applyPreferences(filtered, params.preferences);

    return filtered;
  }

  // Specific filters can be isolated into their own methods for clarity and reusability
  private filterBySearchTerm(articles: Article[], searchTerm: string): Article[] {
    const searchLower = searchTerm.toLowerCase();
    return articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(searchLower) ||  // Search by title
        (article.description && article.description.toLowerCase().includes(searchLower)) ||  // Search by description
        (article.source.name.toLowerCase().includes(searchLower)) ||  // Search by source name
        (article.author && article.author.toLowerCase().includes(searchLower))  // Optionally search by author
      );
    });
  }
  

  private filterByCategory(articles: Article[], categories: string[]): Article[] {
    return articles.filter((article) => article.category && categories.includes(article.category));
  }

  private filterBySource(articles: Article[], sources: string[]): Article[] {
    return articles.filter((article) => sources.includes(article.source.id));
  }

  private filterByDate(articles: Article[], date: Date): Article[] {
    const filterDate = date.toDateString();
    return articles.filter((article) => {
      const articleDate = new Date(article.publishedAt).toDateString();
      return articleDate === filterDate;
    });
  }

  private applyPreferences(articles: Article[], preferences: NewsParams['preferences']): Article[] {
    let filtered = [...articles];

    // Apply preferred sources
    if (preferences.preferredSources.length > 0) {
      filtered.sort((a, b) => {
        const aIsPreferred = preferences.preferredSources.includes(a.source.id);
        const bIsPreferred = preferences.preferredSources.includes(b.source.id);
        return bIsPreferred ? 1 : aIsPreferred ? -1 : 0;
      });
    }

    // Apply preferred categories
    if (preferences.preferredCategories.length > 0) {
      filtered.sort((a, b) => {
        const aCategory = a.category || "";
        const bCategory = b.category || "";
        const aIsPreferred = preferences.preferredCategories.includes(aCategory);
        const bIsPreferred = preferences.preferredCategories.includes(bCategory);
        return bIsPreferred ? 1 : aIsPreferred ? -1 : 0;
      });
    }

    return filtered;
  }
}

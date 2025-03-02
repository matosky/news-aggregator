import { useState, useEffect, useCallback } from "react";
import { NewsParams } from "../types/article";
import { NewsService } from "../services/NewsService";  // Import the NewsService class
import { Article } from "../types/article";
import { NewsAPI } from "../network/NewsAPI";
import { Guardian } from "../network/Guardian";
import { NYTimes } from "../network/NYTimes";

// Initialize the newsService with the required sources
const newsService = new NewsService([new NewsAPI(), new Guardian(), new NYTimes()]);

export function useNews(initialParams: NewsParams) {
  const [params, setParams] = useState<NewsParams>(initialParams);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch articles based on current params
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const articles = await newsService.fetchAllNews(params);  // Fetching the articles
      setAllArticles(articles);
    } catch (err) {
      setError("Failed to load news. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Fetch articles when params change
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Apply filters (including search term) whenever articles or params change
  useEffect(() => {
    const filtered = newsService.filterArticles(allArticles, params);  // Pass the current searchTerm in params
    setFilteredArticles(filtered);  // Update filtered articles state
  }, [allArticles, params]);  // Runs when either allArticles or params change

  // Function to update params (filters, searchTerm, etc.)
  const updateParams = useCallback((newParams: Partial<NewsParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  return { articles: filteredArticles, loading, error, updateParams };
}

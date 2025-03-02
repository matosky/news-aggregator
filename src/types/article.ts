export interface Article {
  id: string
  title: string
  description: string
  content: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  author: string | null
  source: {
    id: string
    name: string
  }
  category?: string | null
  starRating?: string | null
  // Add any common fields here
}

export interface NewsParams {
  searchTerm: string;
  filters: {
    categories: string[];
    sources: string[];
    date?: Date;
  };
  preferences: {
    preferredSources: string[];
    preferredCategories: string[];
    preferredAuthors: string[];
  };
}


export interface NewsAPIArticle {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
  category: string;
}

export interface GuardianArticle {
  id: string; // Article ID
  type: string; // Article type (e.g., "article")
  sectionId: string; // Section ID (e.g., "global-development")
  sectionName: string; // Section name (e.g., "Global development")
  webPublicationDate: string; // Date in ISO format
  webTitle: string; // Title of the article
  webUrl: string; // URL to the article on The Guardian's website
  apiUrl: string; // API URL for the article
  fields: {
    headline: string; // Headline of the article
    starRating?: string; // Optional star rating (if available)
    shortUrl?: string; // Optional short URL
    thumbnail?: string; // Optional thumbnail image URL
    bodyText?: string; // Optional body text, can be undefined if not available
  };
  tags: Array<{
    id: string; // Tag ID (e.g., "profile/caroline-kimeu")
    type: string; // Tag type (e.g., "contributor")
    webTitle: string; // Title of the tag (e.g., "Caroline Kimeu")
    webUrl: string; // URL to the tag's page (e.g., "https://www.theguardian.com/profile/caroline-kimeu")
    apiUrl: string; // API URL to fetch the tag's data
    references: any[]; // Array of references (if any)
    bio: string; // Bio information for contributor or author
    bylineImageUrl: string; // URL to the byline image
    bylineLargeImageUrl: string; // URL to the large byline image
    firstName: string; // Contributor's first name
    lastName: string; // Contributor's last name
  }>;
  isHosted: boolean; // Whether the content is hosted or not
  pillarId: string; // Pillar ID (e.g., "pillar/news")
  pillarName: string; // Pillar name (e.g., "News")
}

export interface NYTArticle {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }[];
  short_url: string;
  keywords: any[];
  news_desk: string;
  section_name: string;
  byline: {
    original: string | null;
    person: any[];
    organization: string | null;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
}


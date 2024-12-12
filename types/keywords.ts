export interface KeywordData {
  keyword: string;
  search_volume: number;
  keyword_difficulty: number;
  cpc: number;
  competition: number;
  search_intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  trend_data: Array<{
    date: string;
    search_volume: number;
  }>;
  serp_features: string[];
}

export interface KeywordSuggestion extends KeywordData {
  relevance_score: number;
  parent_keyword: string;
}

export interface RelatedQuestion {
  question: string;
  keyword: string;
  search_volume: number;
  difficulty: number;
  featured_snippet_likelihood: number;
}

export interface TrendingKeyword extends KeywordData {
  growth_rate: number;
  first_seen: string;
}

export interface KeywordCluster {
  main_keyword: string;
  related_keywords: KeywordData[];
  total_search_volume: number;
  average_difficulty: number;
  topics: string[];
}

export interface CompetitorKeyword {
  keyword: string;
  domain: string;
  position: number;
  search_volume: number;
  traffic: number;
  traffic_cost: number;
  url: string;
}

export interface KeywordGap {
  keyword: string;
  competitor_positions: Record<string, number>;
  search_volume: number;
  difficulty: number;
  opportunity_score: number;
}

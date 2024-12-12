export interface SerpFeature {
  type: string;
}

export interface SerpResult {
  position: number;
  title: string;
  url: string;
  features: SerpFeature[];
}

export interface SerpAnalysis {
  results: SerpResult[];
  features_presence: {
    featured_snippet: boolean;
    knowledge_graph: boolean;
    related_searches: boolean;
    people_also_ask: boolean;
    local_pack: boolean;
  };
}

export interface LocalSerpResult extends SerpResult {
  local_data: {
    name: string;
    address: string;
    rating: number | null;
    reviews_count: number;
    phone?: string;
    website?: string;
  };
}

export interface DeviceComparison {
  differences: {
    type: string;
    url: string;
    desktop_value: number | null;
    mobile_value: number | null;
  }[];
}

export interface HistoricalData {
  date: string;
  position: number | null;
  url: string;
  visibility_index: number;
}

export interface KeywordMetrics {
  search_volume: number;
  cpc: number;
  competition: number;
  trends: Array<{
    year: number;
    month: number;
    search_volume: number;
  }>;
}

export interface SerpFeatureDetails {
  type: 'featured_snippet' | 'knowledge_graph' | 'people_also_ask' | 'related_searches';
  position?: number;
  content?: string;
}

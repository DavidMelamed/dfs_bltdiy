// Consolidated types from api.ts and index.ts
export interface SearchResult {
  id: string;
  keyword: string;
  position: number;
  url: string;
  title: string;
  snippet: string;
}

export interface ApiError {
  message: string;
  code: number;
}

export interface SearchFormData {
  keyword: string;
  location: string;
  language: string;
}

export interface DataForSEOResponse<T> {
  status_code: number;
  status_message: string;
  tasks: Array<{
    id: string;
    status_code: number;
    status_message: string;
    time: string;
    result: T;
  }>;
}

export interface ErrorResponse {
  status_code: number;
  status_message: string;
  tasks?: Array<{
    id: string;
    status_code: number;
    status_message: string;
    time: string;
  }>;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

// Common parameter interfaces
export interface BaseParams {
  limit?: number;
  offset?: number;
  start_date?: string;
  end_date?: string;
  country?: string;
  region?: string;
  city?: string;
  language?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  tag?: string;
}

export interface KeywordParams extends BaseParams {
  keywords: string[];
  search_partners?: boolean;
  include_serp_info?: boolean;
}

export interface DomainParams extends BaseParams {
  target: string;
  include_subdomains?: boolean;
}

export interface CompetitorParams extends DomainParams {
  competitor_domains?: string[];
  metrics?: string[];
}

export interface BacklinkParams extends DomainParams {
  backlink_types?: ('follow' | 'nofollow' | 'redirect' | 'canonical')[];
  link_types?: ('text' | 'image' | 'form' | 'frame')[];
  dofollow_links?: boolean;
}

export interface ContentParams extends BaseParams {
  content: string;
  content_type?: 'text' | 'html' | 'url';
  analyze_sentiment?: boolean;
  extract_entities?: boolean;
}

export interface SERPParams extends BaseParams {
  keyword: string;
  search_engine?: string;
  device?: 'desktop' | 'mobile' | 'tablet';
  depth?: number;
}

export type APIResponse<T> = Promise<DataForSEOResponse<T>>;

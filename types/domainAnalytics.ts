export interface DomainAnalyticsResult {
  domain: string;
  metrics: {
    organic_traffic: number;
    organic_keywords: number;
    backlinks_total: number;
    referring_domains: number;
    domain_rank: number;
  };
  competitors: Array<{
    domain: string;
    common_keywords: number;
    domain_rank: number;
  }>;
  keywords_data: Array<{
    keyword: string;
    position: number;
    search_volume: number;
    traffic: number;
    traffic_cost: number;
    cpc: number;
  }>;
  backlinks_summary: {
    total_backlinks: number;
    referring_domains: number;
    referring_ips: number;
    referring_subnets: number;
    new_backlinks_24h: number;
    lost_backlinks_24h: number;
    dofollow_backlinks: number;
    nofollow_backlinks: number;
  };
  technologies: Array<{
    name: string;
    category: string;
    first_seen: string;
    last_seen: string;
  }>;
}

export interface DomainTechnologiesResult {
  technologies: Array<{
    name: string;
    category: string;
    first_seen: string;
    last_seen: string;
    details?: Record<string, any>;
  }>;
}

export interface DomainComparisonResult {
  date: string;
  domains: Array<{
    domain: string;
    metrics: {
      organic_traffic: number;
      organic_keywords: number;
      backlinks_total: number;
      referring_domains: number;
      domain_rank: number;
    };
    common_keywords: number;
    unique_keywords: number;
  }>;
}

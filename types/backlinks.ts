export interface BacklinksOverview {
  total_backlinks: number;
  referring_domains: number;
  referring_main_domains: number;
  dofollow_backlinks: number;
  nofollow_backlinks: number;
  gov_domains: number;
  edu_domains: number;
  domain_authority: number;
  trust_flow: number;
  citation_flow: number;
  organic_traffic_estimate: number;
  backlink_growth_rate: number;
  toxic_domains_percentage: number;
  historical_data: Array<{
    date: string;
    backlinks: number;
    referring_domains: number;
    domain_authority: number;
  }>;
}

export interface Backlink {
  url_from: string;
  url_to: string;
  anchor: string;
  domain_from: string;
  first_seen: string;
  last_seen: string;
  domain_rank: number;
  page_rank: number;
  domain_authority: number;
  page_authority: number;
  trust_flow: number;
  citation_flow: number;
  backlink_spam_score: number;
  is_dofollow: boolean;
  is_lost: boolean;
  link_type: 'text' | 'image' | 'redirect' | 'canonical' | 'alternate';
  link_location: 'body' | 'header' | 'footer' | 'sidebar';
  link_context: string;
  target_url_traffic: number;
  referring_page_topic: string;
  language: string;
  country_code: string;
}

export interface AnchorText {
  anchor: string;
  backlinks: number;
  referring_domains: number;
  first_seen: string;
  last_seen: string;
  commercial_intent: number;
  relevancy_score: number;
  brand_mentions: boolean;
  anchor_type: 'branded' | 'exact' | 'partial' | 'generic' | 'navigational';
  sentiment_score: number;
}

export interface ReferringDomain {
  domain: string;
  backlinks: number;
  first_seen: string;
  last_seen: string;
  domain_rank: number;
  domain_authority: number;
  trust_flow: number;
  citation_flow: number;
  organic_traffic: number;
  spam_score: number;
  country_code: string;
  language: string;
  industry_category: string;
  site_type: 'blog' | 'news' | 'business' | 'education' | 'government' | 'other';
  update_frequency: 'daily' | 'weekly' | 'monthly' | 'rarely';
  social_presence: {
    facebook_followers: number;
    twitter_followers: number;
    linkedin_followers: number;
  };
  is_new: boolean;
  is_lost: boolean;
}

export interface BacklinkMetrics {
  domain: string;
  total_metrics: {
    total_backlinks: number;
    referring_domains: number;
    domain_authority: number;
    trust_flow: number;
    citation_flow: number;
  };
  link_quality: {
    dofollow_percentage: number;
    toxic_score: number;
    spam_score: number;
    broken_links: number;
  };
  diversity_metrics: {
    unique_domains: number;
    unique_ips: number;
    country_distribution: Record<string, number>;
    language_distribution: Record<string, number>;
  };
  competitor_comparison: {
    domain_vs_competitors: {
      backlinks_difference: number;
      domains_difference: number;
      authority_difference: number;
    };
    common_backlinks: number;
    unique_backlinks: number;
  };
  growth_metrics: {
    monthly_growth: number;
    new_backlinks_30d: number;
    lost_backlinks_30d: number;
    velocity_score: number;
  };
}

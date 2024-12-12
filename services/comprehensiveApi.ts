import axios from 'axios';
import { QueryState } from '../types';

const BASE_URL = '/api/dataforseo';

// Comprehensive domain analysis that fetches multiple metrics in parallel
export async function getDomainAnalysis(domain: string, filters: QueryState['filters']) {
  const results = await Promise.all([
    // Domain Overview
    axios.post(`${BASE_URL}/domain_analytics/domain`, {
      target: domain,
      ...filters
    }),
    
    // Backlink Analysis
    axios.post(`${BASE_URL}/backlinks/summary`, {
      target: domain,
      include_subdomains: true,
      include_indirect_links: true
    }),
    
    // Historical Data
    axios.post(`${BASE_URL}/domain_analytics/history`, {
      target: domain,
      date_from: filters.startDate,
      date_to: filters.endDate
    }),
    
    // Technology Analysis
    axios.post(`${BASE_URL}/domain_analytics/technologies`, {
      target: domain
    }),
    
    // Pages Analysis
    axios.post(`${BASE_URL}/domain_analytics/pages`, {
      target: domain,
      limit: 1000
    })
  ]);

  return {
    overview: results[0].data,
    backlinks: results[1].data,
    history: results[2].data,
    technologies: results[3].data,
    pages: results[4].data
  };
}

// Comprehensive keyword analysis
export async function getKeywordAnalysis(keywords: string[], filters: QueryState['filters']) {
  const results = await Promise.all([
    // Search Volume
    axios.post(`${BASE_URL}/keywords_data/google/search_volume/live`, {
      keywords,
      ...filters
    }),
    
    // Keyword Difficulty
    axios.post(`${BASE_URL}/keywords_data/google/keyword_difficulty`, {
      keywords
    }),
    
    // SERP Features
    axios.post(`${BASE_URL}/serp/google/organic/live/advanced`, {
      keywords,
      ...filters
    }),
    
    // Related Keywords
    ...keywords.map(keyword => 
      axios.post(`${BASE_URL}/keywords_data/google/related_searches`, {
        keyword,
        ...filters
      })
    ),
    
    // Questions
    ...keywords.map(keyword =>
      axios.post(`${BASE_URL}/keywords_data/google/related_questions`, {
        keyword,
        ...filters
      })
    )
  ]);

  return {
    searchVolume: results[0].data,
    difficulty: results[1].data,
    serpFeatures: results[2].data,
    relatedKeywords: results.slice(3, 3 + keywords.length).map(r => r.data),
    questions: results.slice(3 + keywords.length).map(r => r.data)
  };
}

// Comprehensive competitor analysis
export async function getCompetitorAnalysis(
  domain: string,
  competitors: string[],
  filters: QueryState['filters']
) {
  const results = await Promise.all([
    // Main Competitors
    axios.post(`${BASE_URL}/domain_analytics/competitors`, {
      target: domain,
      ...filters
    }),
    
    // Competitor Metrics
    ...competitors.map(competitor =>
      axios.post(`${BASE_URL}/domain_analytics/domain`, {
        target: competitor,
        ...filters
      })
    ),
    
    // Keyword Gaps
    axios.post(`${BASE_URL}/domain_analytics/keyword_intersections`, {
      targets: [domain, ...competitors],
      ...filters
    }),
    
    // Common Backlinks
    ...competitors.map(competitor =>
      axios.post(`${BASE_URL}/backlinks/competitors/intersecting`, {
        target1: domain,
        target2: competitor
      })
    )
  ]);

  return {
    mainCompetitors: results[0].data,
    competitorMetrics: results.slice(1, 1 + competitors.length).map(r => r.data),
    keywordGaps: results[1 + competitors.length].data,
    commonBacklinks: results.slice(2 + competitors.length).map(r => r.data)
  };
}

// Comprehensive content analysis
export async function getContentAnalysis(
  url: string,
  content: string,
  keywords: string[]
) {
  const results = await Promise.all([
    // Content Analysis
    axios.post(`${BASE_URL}/content_analysis/analyze`, {
      content,
      url
    }),
    
    // Keyword Usage
    ...keywords.map(keyword =>
      axios.post(`${BASE_URL}/content_analysis/keyword_density`, {
        content,
        keyword
      })
    ),
    
    // Semantic Analysis
    axios.post(`${BASE_URL}/content_analysis/semantic`, {
      content
    }),
    
    // Page Experience
    axios.post(`${BASE_URL}/on_page/instant`, {
      url
    })
  ]);

  return {
    contentAnalysis: results[0].data,
    keywordUsage: results.slice(1, 1 + keywords.length).map(r => r.data),
    semanticAnalysis: results[1 + keywords.length].data,
    pageExperience: results[2 + keywords.length].data
  };
}

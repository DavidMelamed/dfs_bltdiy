import { apiClient } from './api/client';
import type { BacklinkAnalysisResult } from '../types/api';

export const backlinkService = {
  // Check indexing status for URLs
  async checkIndexingStatus(urls: string[]) {
    const response = await apiClient.post('/dataforseo/on_page/instant_pages', {
      urls,
      check_only_index: true
    });
    return response.data;
  },

  // Get comprehensive backlink data
  async getBacklinkData(domain: string) {
    const [summary, history, anchors, referring] = await Promise.all([
      // Summary data
      apiClient.post('/dataforseo/backlinks/summary', {
        target: domain,
        include_subdomains: true
      }),
      // Historical data
      apiClient.post('/dataforseo/backlinks/history', {
        target: domain,
        date_from: '-1y'
      }),
      // Anchor text distribution
      apiClient.post('/dataforseo/backlinks/anchors', {
        target: domain,
        limit: 1000
      }),
      // Referring domains
      apiClient.post('/dataforseo/backlinks/referring_domains', {
        target: domain,
        limit: 1000
      })
    ]);

    return {
      summary: summary.data,
      history: history.data,
      anchors: anchors.data,
      referring: referring.data
    };
  },

  // Get domain traffic and metrics
  async getDomainMetrics(domains: string[]) {
    const response = await apiClient.post('/dataforseo/domain_analytics/bulk', {
      targets: domains,
      metrics: [
        'organic_traffic',
        'organic_keywords',
        'domain_rank',
        'trust_flow',
        'citation_flow'
      ]
    });
    return response.data;
  },

  // Get content metrics for URLs
  async getContentMetrics(urls: string[]) {
    const response = await apiClient.post('/dataforseo/content_analysis/bulk', {
      urls,
      metrics: [
        'word_count',
        'readability_score',
        'content_quality',
        'last_modified'
      ]
    });
    return response.data;
  },

  async getBacklinkSummary(domain: string): Promise<BacklinkAnalysisResult> {
    try {
      const response = await apiClient.post('/backlinks/summary', [{
        target: domain,
        include_subdomains: true,
        include_indirect_links: true
      }]);

      return response.tasks[0].result[0];
    } catch (error) {
      console.error('Failed to get backlink summary:', error);
      throw new Error('Failed to get backlink summary');
    }
  },

  async getBacklinkList(domain: string, limit: number = 100) {
    try {
      const response = await apiClient.post('/backlinks/list', [{
        target: domain,
        limit,
        include_lost: true,
        include_meta: true
      }]);

      return response.tasks[0].result[0].items;
    } catch (error) {
      console.error('Failed to get backlink list:', error);
      throw new Error('Failed to get backlink list');
    }
  },

  async getAnchorText(domain: string) {
    try {
      const response = await apiClient.post('/backlinks/anchors', [{
        target: domain,
        include_subdomains: true
      }]);

      return response.tasks[0].result[0].anchors;
    } catch (error) {
      console.error('Failed to get anchor text:', error);
      throw new Error('Failed to get anchor text');
    }
  },

  async getCompetitorBacklinks(domain: string, competitors: string[]) {
    try {
      const response = await apiClient.post('/backlinks/competitors', [{
        target: domain,
        competitors
      }]);

      return response.tasks[0].result[0].comparison;
    } catch (error) {
      console.error('Failed to get competitor backlinks:', error);
      throw new Error('Failed to get competitor backlinks');
    }
  }
};

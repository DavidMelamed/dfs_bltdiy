import { apiClient } from './api/client';
import type { CompetitorAnalysisResult } from '../types/api';

export const competitiveContentService = {
  async analyzeCompetitors(domain: string, competitors: string[]): Promise<CompetitorAnalysisResult> {
    try {
      const [contentGap, commonTopics, performanceComparison] = await Promise.all([
        // Content gap analysis
        apiClient.post('/content_analysis/competitors/gaps', [{
          target: domain,
          competitors,
          limit: 100
        }]),
        
        // Common topics analysis
        apiClient.post('/content_analysis/competitors/topics', [{
          target: domain,
          competitors,
          include_keywords: true
        }]),
        
        // Performance comparison
        apiClient.post('/content_analysis/competitors/metrics', [{
          target: domain,
          competitors
        }])
      ]);

      return {
        contentGaps: contentGap.tasks[0].result[0].gaps,
        commonTopics: commonTopics.tasks[0].result[0].topics,
        performance: performanceComparison.tasks[0].result[0].metrics
      };
    } catch (error) {
      console.error('Competitor analysis failed:', error);
      throw new Error('Failed to analyze competitors');
    }
  },

  async getCompetitorInsights(domain: string): Promise<any> {
    try {
      const response = await apiClient.post('/content_analysis/competitors/insights', [{
        target: domain,
        limit: 10
      }]);
      
      return response.tasks[0].result[0].insights;
    } catch (error) {
      console.error('Failed to get competitor insights:', error);
      throw new Error('Failed to get competitor insights');
    }
  },

  async compareContent(url1: string, url2: string): Promise<any> {
    try {
      const response = await apiClient.post('/content_analysis/compare', [{
        url1,
        url2,
        include_details: true
      }]);
      
      return response.tasks[0].result[0].comparison;
    } catch (error) {
      console.error('Content comparison failed:', error);
      throw new Error('Failed to compare content');
    }
  }
};

import { apiClient } from './api/client';
import type { ContentAnalysisResult } from '../types/api';

interface ContentAnalysisParams {
  type: 'url' | 'text';
  content: string;
}

export const contentService = {
  async analyzeContent({ type, content }: ContentAnalysisParams): Promise<ContentAnalysisResult> {
    try {
      // Run multiple analyses in parallel
      const [
        readabilityAnalysis,
        semanticAnalysis,
        contentQualityAnalysis,
        pageTechnicalAnalysis
      ] = await Promise.all([
        // Readability analysis
        apiClient.post('/content_analysis/readability', [{
          [type]: content,
          language_name: "English",
          calculate_on_demand: true
        }]),
        
        // Semantic analysis
        apiClient.post('/content_analysis/categories', [{
          [type]: content,
          include_topics: true
        }]),
        
        // Content quality analysis
        apiClient.post('/content_analysis/summary', [{
          [type]: content,
          calculate_on_demand: true
        }]),
        
        // Page technical analysis (only for URLs)
        type === 'url' ? apiClient.post('/content_analysis/page_metrics', [{
          url: content
        }]) : Promise.resolve(null)
      ]);

      // Process and combine the results
      return this.processAnalysisResults({
        readability: readabilityAnalysis.tasks[0].result[0],
        semantic: semanticAnalysis.tasks[0].result[0],
        quality: contentQualityAnalysis.tasks[0].result[0],
        technical: type === 'url' ? pageTechnicalAnalysis?.tasks[0].result[0] : null
      });
    } catch (error) {
      console.error('Content analysis failed:', error);
      throw new Error('Failed to analyze content');
    }
  },

  async analyzeMultipleUrls(urls: string[]) {
    try {
      const response = await apiClient.post('/content_analysis/batch', urls.map(url => ({
        url,
        calculate_on_demand: true
      })));

      return response.tasks.map(task => task.result[0]);
    } catch (error) {
      console.error('Batch content analysis failed:', error);
      throw new Error('Failed to analyze multiple URLs');
    }
  },

  async getContentSuggestions(topic: string) {
    try {
      const response = await apiClient.post('/content_analysis/suggestions', [{
        topic,
        language_name: "English"
      }]);

      return response.tasks[0].result[0].suggestions;
    } catch (error) {
      console.error('Content suggestions failed:', error);
      throw new Error('Failed to get content suggestions');
    }
  },

  private processAnalysisResults(results: any): ContentAnalysisResult {
    const { readability, semantic, quality, technical } = results;

    return {
      readability: {
        score: readability?.score || 0,
        grade_level: readability?.grade_level || 'N/A',
        reading_time: readability?.reading_time || 0,
        word_count: readability?.word_count || 0
      },
      semantic: {
        categories: this.processTopics(semantic?.categories || []),
        entities: semantic?.entities || [],
        sentiment: semantic?.sentiment || 'neutral'
      },
      quality: {
        content_score: quality?.content_score || 0,
        uniqueness_score: quality?.uniqueness_score || 0,
        relevance_score: quality?.relevance_score || 0,
        keywords: this.processKeywords(quality?.keywords || [])
      },
      technical: technical ? {
        page_load_time: technical.page_load_time,
        word_count: technical.word_count,
        content_length: technical.content_length,
        title_length: technical.title_length,
        meta_description_length: technical.meta_description_length
      } : null
    };
  },

  private processKeywords(keywords: any[]) {
    return keywords.map(kw => ({
      keyword: kw.keyword,
      density: kw.density,
      count: kw.count,
      importance: kw.importance
    }));
  },

  private processTopics(topics: any[]) {
    return topics.map(topic => ({
      name: topic.name,
      relevance: topic.relevance,
      confidence: topic.confidence
    }));
  }
};

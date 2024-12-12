import axios, { AxiosInstance } from 'axios';
import { env } from '@config/env';
import {
  APIResponse,
  BacklinkParams,
  CompetitorParams,
  ContentParams,
  DataForSEOResponse,
  DomainParams,
  ErrorResponse,
  KeywordParams,
  RequestOptions,
  SERPParams,
} from '@types/api';

export class DataForSEOError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'DataForSEOError';
  }
}

export class DataForSEOService {
  private readonly api: AxiosInstance;

  constructor() {
    const auth = btoa(`${env.VITE_DATAFORSEO_USERNAME}:${env.VITE_DATAFORSEO_PASSWORD}`);
    
    this.api = axios.create({
      baseURL: 'https://api.dataforseo.com/v3',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });
  }

  private async makeRequest<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
    try {
      console.log(`Making request to ${endpoint}`, {
        data: data ? [data] : undefined,
        headers: this.api.defaults.headers
      });
      
      const response = await this.api.post<T>(endpoint, data ? [data] : undefined, {
        signal: options.signal,
        headers: options.headers
      });
      
      console.log(`Response from ${endpoint}:`, response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('DataForSEO API Error:', {
          endpoint,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers
        });
        throw new DataForSEOError(
          error.response?.data?.status_message || error.message,
          error.response?.status,
          error.response?.data
        );
      }
      console.error('Non-Axios error:', error);
      throw new DataForSEOError('Failed to make API request', undefined, error);
    }
  }

  // SERP Analysis
  async getSERPResults(params: SERPParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('serp/google/organic/live/advanced', {
        keyword: params.keyword,
        location_name: params.location_name,
        language_code: params.language_code || "en",
        device: params.device || "desktop",
        search_engine: "google",
        depth: params.depth || 100
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid SERP results response structure');
      }

      return response;
    } catch (error) {
      console.error('SERP Results Error:', error);
      throw error;
    }
  }

  async getSERPCompetitors(params: SERPParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('serp/google/competitors/live/regular', {
        keyword: params.keyword,
        location_name: params.location_name,
        language_code: params.language_code || "en",
        device: params.device || "desktop"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid SERP competitors response structure');
      }

      return response;
    } catch (error) {
      console.error('SERP Competitors Error:', error);
      throw error;
    }
  }

  // Keyword Research
  async getKeywordData(params: KeywordParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('keywords_data/google/search_volume/live', {
        keywords: Array.isArray(params.keywords) ? params.keywords : [params.keywords],
        location_name: params.location_name,
        language_code: params.language_code || "en"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid keyword data response structure');
      }

      return response;
    } catch (error) {
      console.error('Keyword Data Error:', error);
      throw error;
    }
  }

  async getKeywordSuggestions(params: KeywordParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('keywords_data/google/suggestions/live', {
        keyword: params.keywords[0],
        location_name: params.location_name,
        language_code: params.language_code || "en"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid keyword suggestions response structure');
      }

      return response;
    } catch (error) {
      console.error('Keyword Suggestions Error:', error);
      throw error;
    }
  }

  async getKeywordDifficulty(params: KeywordParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('keywords_data/google/keyword_difficulty/live', {
        keywords: Array.isArray(params.keywords) ? params.keywords : [params.keywords],
        location_name: params.location_name,
        language_code: params.language_code || "en"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid keyword difficulty response structure');
      }

      return response;
    } catch (error) {
      console.error('Keyword Difficulty Error:', error);
      throw error;
    }
  }

  // Domain Analysis
  async getDomainOverview(params: DomainParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('domain_analytics/google/overview/live', {
        target: params.domain,
        location_code: params.location_code,
        language_code: params.language_code || "en"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid domain overview response structure');
      }

      return response;
    } catch (error) {
      console.error('Domain Overview Error:', error);
      throw error;
    }
  }

  async getDomainRankings(params: DomainParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('domain_analytics/google/organic/live', {
        target: params.domain,
        location_code: params.location_code,
        language_code: params.language_code || "en"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid domain rankings response structure');
      }

      return response;
    } catch (error) {
      console.error('Domain Rankings Error:', error);
      throw error;
    }
  }

  // Competitor Analysis
  async analyzeCompetitors(params: CompetitorParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('dataforseo_labs/google/competitors_domain/live', {
        target: params.domain,
        location_code: params.location_code,
        language_code: params.language_code || "en"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid competitor analysis response structure');
      }

      return response;
    } catch (error) {
      console.error('Competitor Analysis Error:', error);
      throw error;
    }
  }

  async getCompetitorKeywords(params: CompetitorParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('dataforseo_labs/google/domain_keywords/live', {
        target: params.domain,
        location_code: params.location_code,
        language_code: params.language_code || "en"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid competitor keywords response structure');
      }

      return response;
    } catch (error) {
      console.error('Competitor Keywords Error:', error);
      throw error;
    }
  }

  // Backlink Analysis
  async getBacklinkData(params: BacklinkParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('backlinks/summary/live', {
        target: params.target,
        target_type: params.target_type,
        limit: params.limit
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid backlink data response structure');
      }

      return response;
    } catch (error) {
      console.error('Backlink Data Error:', error);
      throw error;
    }
  }

  async getBacklinkAnchors(params: BacklinkParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('backlinks/anchors/live', {
        target: params.target,
        target_type: params.target_type,
        limit: params.limit
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid backlink anchors response structure');
      }

      return response;
    } catch (error) {
      console.error('Backlink Anchors Error:', error);
      throw error;
    }
  }

  async getBacklinkDomains(params: BacklinkParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('backlinks/referring_domains/live', {
        target: params.target,
        target_type: params.target_type,
        limit: params.limit
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid backlink domains response structure');
      }

      return response;
    } catch (error) {
      console.error('Backlink Domains Error:', error);
      throw error;
    }
  }

  // Content Analysis
  async analyzeContent(params: ContentParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('content_analysis/summary', {
        page_url: params.page_url,
        target: params.target,
        target_type: params.target_type
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid content analysis response structure');
      }

      return response;
    } catch (error) {
      console.error('Content Analysis Error:', error);
      throw error;
    }
  }

  async getContentMetrics(params: ContentParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('content_analysis/metrics', {
        page_url: params.page_url,
        target: params.target,
        target_type: params.target_type
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid content metrics response structure');
      }

      return response;
    } catch (error) {
      console.error('Content Metrics Error:', error);
      throw error;
    }
  }

  // Historical Data
  async getHistoricalSearchVolume(params: KeywordParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('keywords_data/google/search_volume/history', {
        keywords: Array.isArray(params.keywords) ? params.keywords : [params.keywords],
        location_name: params.location_name,
        language_code: params.language_code || "en"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid historical search volume response structure');
      }

      return response;
    } catch (error) {
      console.error('Historical Search Volume Error:', error);
      throw error;
    }
  }

  async getHistoricalRankings(params: DomainParams, options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('domain_analytics/ranking/history', {
        target: params.domain,
        location_code: params.location_code,
        language_code: params.language_code || "en"
      }, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid historical rankings response structure');
      }

      return response;
    } catch (error) {
      console.error('Historical Rankings Error:', error);
      throw error;
    }
  }

  // Utility Methods
  async checkCredits(options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('user/credits', undefined, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid credits response structure');
      }

      return response;
    } catch (error) {
      console.error('Credits Error:', error);
      throw error;
    }
  }

  async getLocations(options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('locations', undefined, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid locations response structure');
      }

      return response;
    } catch (error) {
      console.error('Locations Error:', error);
      throw error;
    }
  }

  async getLanguages(options?: RequestOptions): Promise<APIResponse<any>> {
    try {
      const response = await this.makeRequest('languages', undefined, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid languages response structure');
      }

      return response;
    } catch (error) {
      console.error('Languages Error:', error);
      throw error;
    }
  }

  async getRankTracking(params: any, options?: RequestOptions): Promise<APIResponse<DataForSEOResponse>> {
    try {
      const response = await this.makeRequest('rank_tracking/google/advanced', params, options);

      if (!response.tasks?.[0]?.result) {
        throw new DataForSEOError('Invalid rank tracking response structure');
      }

      return response;
    } catch (error) {
      console.error('Rank Tracking Error:', error);
      throw error;
    }
  }
}

export const dataForSEOService = new DataForSEOService();

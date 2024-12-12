import axios, { AxiosInstance } from 'axios';

interface DataForSEOConfig {
  username: string;
  password: string;
  baseURL?: string;
}

interface DataForSEOResponse<T = any> {
  status_code: number;
  status_message: string;
  tasks: Array<{
    id: string;
    status_code: number;
    status_message: string;
    time: string;
    result: T[];
  }>;
}

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

export class DataForSEOClient {
  private readonly client: AxiosInstance;

  constructor(config: DataForSEOConfig) {
    const auth = btoa(`${config.username}:${config.password}`);
    
    this.client = axios.create({
      baseURL: config.baseURL || 'https://api.dataforseo.com/v3',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          throw new DataForSEOError(
            error.response.data?.status_message || error.message,
            error.response.status,
            error.response.data
          );
        }
        throw new DataForSEOError(error.message);
      }
    );
  }

  async makeRequest<T = any>(endpoint: string, data: any): Promise<DataForSEOResponse<T>> {
    try {
      const response = await this.client.post<DataForSEOResponse<T>>(
        endpoint,
        [data] // DataForSEO expects data in an array
      );
      return response.data;
    } catch (error) {
      if (error instanceof DataForSEOError) {
        throw error;
      }
      throw new DataForSEOError('Failed to make API request');
    }
  }

  // Backlinks API
  async getBacklinksSummary(params: {
    target: string;
    internal_list_limit?: number;
    backlinks_status_type?: 'all' | 'live' | 'broken';
    include_subdomains?: boolean;
    exclude_internal_backlinks?: boolean;
    include_indirect_links?: boolean;
  }) {
    return this.makeRequest('backlinks/summary/live', {
      target: params.target,
      internal_list_limit: params.internal_list_limit || 300,
      backlinks_status_type: params.backlinks_status_type || 'all',
      include_subdomains: params.include_subdomains ?? true,
      exclude_internal_backlinks: params.exclude_internal_backlinks ?? false,
      include_indirect_links: params.include_indirect_links ?? true
    });
  }
}

// Create and export a singleton instance
export const dataForSEOClient = new DataForSEOClient({
  username: import.meta.env.VITE_DATAFORSEO_USERNAME,
  password: import.meta.env.VITE_DATAFORSEO_PASSWORD
});

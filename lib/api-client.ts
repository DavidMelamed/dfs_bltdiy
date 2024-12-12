import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for error handling
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status,
      data: error.response?.data
    };
    return Promise.reject(customError);
  }
);

// API service
export const api = {
  // Domain Analysis
  getDomainMetrics: (domain: string) => 
    apiClient.post('/domain-metrics', { domain }),
    
  // Keyword Analysis
  getKeywordMetrics: (keyword: string) =>
    apiClient.post('/keyword-metrics', { keyword }),
    
  // SERP Analysis
  getSerpResults: (keyword: string) =>
    apiClient.post('/serp-results', { keyword }),
    
  // Backlink Analysis
  getBacklinkMetrics: (domain: string) =>
    apiClient.post('/backlink-metrics', { domain })
};

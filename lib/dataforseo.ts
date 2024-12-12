import { DataForSEOAPI } from 'dataforseo-client';

// Initialize the DataForSEO client
const client = new DataForSEOAPI({
  username: process.env.DATAFORSEO_LOGIN || '',
  password: process.env.DATAFORSEO_PASSWORD || '',
});

// Utility function to check if credentials are set
export const checkCredentials = (): boolean => {
  return Boolean(process.env.DATAFORSEO_LOGIN && process.env.DATAFORSEO_PASSWORD);
};

// Export pre-configured client instances for different APIs
export const serp = client.serp;
export const keywords = client.keywords;
export const backlinks = client.backlinks;
export const domain = client.domain_analytics;
export const content = client.content_analysis;

// Error handler utility
export const handleDataForSEOError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

// Type guard for API responses
export const isSuccessResponse = <T>(
  response: { status_code?: number; tasks?: Array<{ result?: T[] }> }
): response is { status_code: number; tasks: Array<{ result: T[] }> } => {
  return (
    response.status_code === 20000 &&
    Array.isArray(response.tasks) &&
    response.tasks.length > 0 &&
    Array.isArray(response.tasks[0]?.result)
  );
};

export default client;

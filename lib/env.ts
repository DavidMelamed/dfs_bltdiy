interface Env {
  DATAFORSEO_LOGIN: string;
  DATAFORSEO_PASSWORD: string;
  NODE_ENV: 'development' | 'production' | 'test';
  API_BASE_URL: string;
}

export const env: Env = {
  DATAFORSEO_LOGIN: import.meta.env.VITE_DATAFORSEO_LOGIN || '',
  DATAFORSEO_PASSWORD: import.meta.env.VITE_DATAFORSEO_PASSWORD || '',
  NODE_ENV: import.meta.env.MODE as 'development' | 'production' | 'test',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.dataforseo.com',
};

import axios from 'axios';
import { env } from '../../config/env';

if (!env.VITE_DATAFORSEO_LOGIN || !env.VITE_DATAFORSEO_PASSWORD) {
  throw new Error('DataForSEO credentials are not configured');
}

const auth = btoa(`${env.VITE_DATAFORSEO_LOGIN}:${env.VITE_DATAFORSEO_PASSWORD}`);

export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000, // 30 second timeout
});

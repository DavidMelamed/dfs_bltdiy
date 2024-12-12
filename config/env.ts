interface Env {
  VITE_DATAFORSEO_LOGIN: string;
  VITE_DATAFORSEO_PASSWORD: string;
  VITE_API_BASE_URL: string;
  VITE_APP_ENV: 'development' | 'production' | 'test';
}

function validateEnv(): Env {
  const requiredEnvVars = [
    'VITE_DATAFORSEO_LOGIN',
    'VITE_DATAFORSEO_PASSWORD',
  ];

  for (const envVar of requiredEnvVars) {
    if (!import.meta.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  return {
    VITE_DATAFORSEO_LOGIN: import.meta.env.VITE_DATAFORSEO_LOGIN,
    VITE_DATAFORSEO_PASSWORD: import.meta.env.VITE_DATAFORSEO_PASSWORD,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.dataforseo.com/v3',
    VITE_APP_ENV: (import.meta.env.VITE_APP_ENV as Env['VITE_APP_ENV']) || 'development',
  };
}

export const env = validateEnv();

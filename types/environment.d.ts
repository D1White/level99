declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      SUPERBASE_URL: string;
      SUPERBASE_KEY: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};

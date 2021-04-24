export interface EnvironmentVariables {
  PORT: number;
  HOST: string;
  DB_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  KARPULLY_EMAIL_LOGIN: string;
  KARPULLY_EMAIL_PASSWORD: string;
  SEED_NUMBER: number;
}

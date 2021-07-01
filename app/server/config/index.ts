// Load environment variables from .env, .env.local, etc. This explicit call
// into `@next/env` allows using environment variables before next() is called.
// More info: https://nextjs.org/docs/basic-features/environment-variables
import { loadEnvConfig } from '@next/env'
loadEnvConfig('./', process.env.NODE_ENV !== 'production')

export const config = {
  IS_PROD: process.env.NODE_ENV === 'production',
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  SESS_SECRET: process.env.SESS_SECRET,
  COOKIE_NAME: process.env.COOKIE_NAME,
  MAX_AGE: parseInt(process.env.MAX_AGE || '180000000', 10),
  TTL: process.env.TTL,
  USERNAME: process.env._USERNAME,
  PASSWORD: process.env._PASSWORD,
  _AUTHENTICATE: process.env._AUTHENTICATE
};

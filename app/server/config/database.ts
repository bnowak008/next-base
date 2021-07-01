import { config } from '.';

export default {
  DB_CONFIG: {
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    server: config.DB_HOST,
    database: config.DB_NAME,
  },
};

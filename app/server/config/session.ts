import redis from 'redis';
import connectRedis from 'connect-redis';
import { config } from '.';
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, SESS_SECRET, IS_PROD, COOKIE_NAME, TTL, MAX_AGE } = config;

export const initSession = (app, session) => {
  const RedisStore = connectRedis(session);
  const sessionClient = redis.createClient();
  const sessionStore = new RedisStore({ host: REDIS_HOST, port: REDIS_PORT, client: sessionClient, ttl: TTL });

  app.use(
    session({
      secret: SESS_SECRET,
      store: sessionStore,
      // cookie: { maxAge: MAX_AGE },
      resave: false,
      saveUninitialized: true,
      rolling: true
    }),
  );
};

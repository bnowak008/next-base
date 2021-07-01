import { promisify } from 'util';
import redis from 'redis';
import { config } from '.';

export const { REDIS_HOST, REDIS_PORT } = config;

const client = redis.createClient({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
});

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const delAsync = promisify(client.del).bind(client);
const llenAsync = promisify(client.llen).bind(client);
const keysAsync = promisify(client.keys).bind(client);

const asyncRedis = { setAsync, getAsync, delAsync, llenAsync, keysAsync };

export { redis, asyncRedis }

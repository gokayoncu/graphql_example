import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  host: process.env.REDIS_HOST, 
  port: process.env.REDIS_PORT, 
  retryStrategy: times => {
    // Yeniden bağlanma stratejisi
    return Math.min(times * 50, 2000);
  }
};

const pubSub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});
export default pubSub;
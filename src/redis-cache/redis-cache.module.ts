import {CacheModule, Module} from '@nestjs/common';
import {RedisCacheService} from './redis-cache.service';
import * as redisStore from 'cache-manager-redis-store';
require('dotenv').config();
@Module({
  providers: [RedisCacheService],
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}

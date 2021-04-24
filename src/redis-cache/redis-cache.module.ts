import {CacheModule, Module} from '@nestjs/common';
import {RedisCacheService} from './redis-cache.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  providers: [RedisCacheService],
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}

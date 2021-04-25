import {CacheModule, Module} from '@nestjs/common';
import {RedisCacheService} from './redis-cache.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  providers: [RedisCacheService],
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      }),
    }),
  ],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}

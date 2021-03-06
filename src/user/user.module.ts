import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';
import {User} from './entities/user.entity';
import {GraphQLModule} from '@nestjs/graphql';

import {TypeOrmModule} from '@nestjs/typeorm';
import {JwtStrategy} from '../auth/strategies/jwt.strategy';
import {AuthModule} from '../auth/auth.module';
import {EmailService} from '../email/email.service';
import {EmailModule} from '../email/email.module';
import {RedisCacheModule} from '../redis-cache/redis-cache.module';
@Module({
  providers: [UserResolver, UserService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    EmailModule,
    RedisCacheModule,
    AuthModule,
  ],
  exports: [UserService],
})
export class UserModule {}

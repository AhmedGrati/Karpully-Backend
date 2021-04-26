import {Module} from '@nestjs/common';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {AuthService} from './auth.service';
import {JwtStrategy} from './strategies/jwt.strategy';
import {AuthResolver} from './auth.resolver';
import * as dotenv from 'dotenv';
import {RedisCacheModule} from '../redis-cache/redis-cache.module';
import {ConnectionHistoricModule} from '../connection-historic/connection-historic.module';
import {ConnectionModule} from '../connection/connection.module';

dotenv.config();
@Module({
  providers: [AuthService, JwtStrategy, AuthResolver],
  imports: [
    ConnectionHistoricModule,
    ConnectionModule,
    JwtModule.register({
      signOptions: {expiresIn: 3600},
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([User]),
    RedisCacheModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}

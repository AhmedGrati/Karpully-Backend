import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EnvironmentVariables } from 'src/common/EnvironmentVariables';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  providers: [AuthService, JwtStrategy, AuthResolver],
  imports: [
    JwtModule.register({
      signOptions: {expiresIn: 3600},
      secret: process.env.SECRET
    }), 
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [AuthService]
})
export class AuthModule {}

import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigService } from './config/DatabaseConfigService';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/guards/roles.guards';


@Module({
  imports: [
    UserModule, 
    TypeOrmModule.forRoot(databaseConfigService),
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    GraphQLModule.forRoot({
      fieldResolverEnhancers:["guards"],
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

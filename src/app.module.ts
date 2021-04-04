import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigService } from './config/DatabaseConfigService';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { EmailModule } from './email/email.module';

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
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

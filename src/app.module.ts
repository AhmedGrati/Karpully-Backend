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
import { FakeUserModule } from './faker/fake-user/fake-user.module';
import { CarpoolModule } from './carpool/carpool.module';
import { GovModule } from './gov/gov.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    UserModule, 
    TypeOrmModule.forRoot(databaseConfigService),
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    GraphQLModule.forRoot({
      
      introspection:true,
      playground: true,
      fieldResolverEnhancers:["guards"],
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    }),
    EmailModule,
    FakeUserModule,
    CarpoolModule,
    GovModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

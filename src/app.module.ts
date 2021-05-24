import { CacheModule, Module } from '@nestjs/common';
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
import { CaslModule } from './casl/casl.module';
import { FakerCarpoolModule } from './faker/faker-carpool/faker-carpool.module';
import { FakerCityModule } from './faker/faker-city/faker-city.module';
import { FakerGovModule } from './faker/faker-gov/faker-gov.module';
import { FakerModule } from './faker/faker.module';
import { SubmissionModule } from './submission/submission.module';
import { NotificationModule } from './notification/notification.module';
import { LocationModule } from './location/location.module';

import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ConnectionHistoricModule } from './connection-historic/connection-historic.module';
import { ConnectionModule } from './connection/connection.module';
import { DirectionModule } from './direction/direction.module';
import { ProfileImgUploadModule } from './profile-img-upload/profile-img-upload.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { InvitationModule } from './invitation/invitation.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(databaseConfigService),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      introspection: true,
      playground: true,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    }),
    EmailModule,
    FakeUserModule,
    CarpoolModule,
    GovModule,
    CityModule,
    CaslModule,
    FakerCarpoolModule,
    FakerCityModule,
    FakerGovModule,
    FakerModule,
    SubmissionModule,
    NotificationModule,
    LocationModule,
    RedisCacheModule,
    ConnectionHistoricModule,
    ConnectionModule,
    DirectionModule,
    ProfileImgUploadModule,
    ChatModule,
    MessageModule,
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

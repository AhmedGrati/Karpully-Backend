import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Notification} from '../notification/entities/notification.entity';

import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [NotificationResolver, NotificationService,{
      provide: 'PUB_SUB',
      useValue: new PubSub(),
  }],
  imports: [TypeOrmModule.forFeature([Notification])],
  exports: [NotificationService]
})
export class NotificationModule {}

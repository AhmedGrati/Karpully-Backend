import {Module} from '@nestjs/common';
import {MessageService} from './message.service';
import {MessageResolver} from './message.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Message} from './entities/message.entity';

import {PubSub} from 'graphql-subscriptions';
import {UserModule} from '../user/user.module';
import {ChatModule} from '../chat/chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule, ChatModule],
  providers: [
    MessageResolver,
    MessageService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class MessageModule {}

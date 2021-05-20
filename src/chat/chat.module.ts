import {Module} from '@nestjs/common';
import {ChatService} from './chat.service';
import {ChatResolver} from './chat.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Chat} from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}

import {Module} from '@nestjs/common';
import {ChatService} from './chat.service';
import {ChatResolver} from './chat.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Chat} from './entities/chat.entity';
import {UserModule} from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UserModule],
  providers: [ChatResolver, ChatService],
  exports: [ChatService],
})
export class ChatModule {}

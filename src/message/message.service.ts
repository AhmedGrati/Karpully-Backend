import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateMessageInput} from './dto/create-message.input';
import {UpdateMessageInput} from './dto/update-message.input';
import {PubSub} from 'graphql-subscriptions';
import {InjectRepository} from '@nestjs/typeorm';
import {Message} from './entities/message.entity';
import {Repository} from 'typeorm';
import {ChatService} from '../chat/chat.service';
import {UserService} from '../user/user.service';
import {MESSAGE_BASE_TOPIC_NAME} from '../utils/constants';
import {User} from '../user/entities/user.entity';
import {Chat} from '../chat/entities/chat.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}
  async create(createMessageInput: CreateMessageInput) {
    const {chatId, senderId} = createMessageInput;
    const createdMessage = await this.messageRepository.create(
      createMessageInput,
    );
    const chat: Chat = await this.chatService.findOne(chatId);
    const sender: User = await this.userService.internalFindOne(senderId);
    createdMessage.chat = chat;
    createdMessage.sender = sender;

    const savedMessage = await this.messageRepository.save(createdMessage);
    this.sendMessageToAllReceivers(savedMessage, chat);
    return savedMessage;
  }

  publishMessageToQueue(message: Message, receiver: User) {
    this.pubSub.publish(MESSAGE_BASE_TOPIC_NAME + receiver.id, {
      message,
    });
  }

  sendMessageToAllReceivers(message: Message, chat: Chat) {
    Logger.log(chat.users, 'chat users');
    for (const user of chat.users) {
      this.publishMessageToQueue(message, user);
    }
  }

  message(receiverId) {
    return this.pubSub.asyncIterator(MESSAGE_BASE_TOPIC_NAME + receiverId);
  }

  // findAll() {
  //   return `This action returns all message`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageInput: UpdateMessageInput) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}

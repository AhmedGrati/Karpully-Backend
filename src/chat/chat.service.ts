import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {UserService} from '../user/user.service';
import {Repository} from 'typeorm';
import {CreateChatInput} from './dto/create-chat.input';
import {UpdateChatInput} from './dto/update-chat.input';
import {Chat} from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    private readonly userService: UserService,
  ) {}
  async create(createChatInput: CreateChatInput) {
    const chat = await this.chatRepository.create();

    const {userIds} = createChatInput;
    const users: User[] = await this.listOfChatUsers(userIds);
    chat.users = users;

    return await this.chatRepository.save(chat);
  }
  async listOfChatUsers(userIds: number[]): Promise<User[]> {
    const chatUsers: User[] = [];
    for (const id of userIds) {
      const user = await this.userService.internalFindOne(id);
      chatUsers.push(user);
    }
    return chatUsers;
  }

  async findAll() {
    return await this.chatRepository.find();
  }

  async findOne(id: number) {
    return await this.chatRepository.findOne({where: {id}});
  }

  // update(id: number, updateChatInput: UpdateChatInput) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}

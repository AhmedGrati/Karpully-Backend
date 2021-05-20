import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {ChatService} from './chat.service';
import {Chat} from './entities/chat.entity';
import {CreateChatInput} from './dto/create-chat.input';
import {UpdateChatInput} from './dto/update-chat.input';
import {Auth} from '../shared/decorators/auth.decorator';
import {UserRoleEnum} from '../user/entities/user-role.enum';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Chat)
  @Auth(UserRoleEnum.USER)
  createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatService.create(createChatInput);
  }

  @Query(() => [Chat], {name: 'chat'})
  @Auth(UserRoleEnum.USER)
  findAll() {
    return this.chatService.findAll();
  }

  @Query(() => Chat, {name: 'chat'})
  @Auth(UserRoleEnum.USER)
  findOne(@Args('id', {type: () => Int}) id: number) {
    return this.chatService.findOne(id);
  }

  // @Mutation(() => Chat)
  // updateChat(@Args('updateChatInput') updateChatInput: UpdateChatInput) {
  //   return this.chatService.update(updateChatInput.id, updateChatInput);
  // }

  // @Mutation(() => Chat)
  // removeChat(@Args('id', { type: () => Int }) id: number) {
  //   return this.chatService.remove(id);
  // }
}

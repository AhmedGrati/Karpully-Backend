import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import {MessageService} from './message.service';
import {Message} from './entities/message.entity';
import {CreateMessageInput} from './dto/create-message.input';
import {UpdateMessageInput} from './dto/update-message.input';
import {Logger} from '@nestjs/common';
import {Auth} from '../shared/decorators/auth.decorator';
import {UserRoleEnum} from '../user/entities/user-role.enum';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  @Auth(UserRoleEnum.USER)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.messageService.create(createMessageInput);
  }

  @Subscription(() => Message)
  message(@Args('userId') userId: number) {
    return this.messageService.message(userId);
  }
  // @Query(() => [Message], { name: 'message' })
  // findAll() {
  //   return this.messageService.findAll();
  // }

  // @Query(() => Message, { name: 'message' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.messageService.findOne(id);
  // }

  // @Mutation(() => Message)
  // updateMessage(@Args('updateMessageInput') updateMessageInput: UpdateMessageInput) {
  //   return this.messageService.update(updateMessageInput.id, updateMessageInput);
  // }

  // @Mutation(() => Message)
  // removeMessage(@Args('id', { type: () => Int }) id: number) {
  //   return this.messageService.remove(id);
  // }
}

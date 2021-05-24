import {InputType, Int, Field} from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  chatId: number;

  @Field()
  senderId: number;

  @Field()
  content: string;
}

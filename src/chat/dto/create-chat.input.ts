import {InputType, Int, Field} from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field(() => [Number])
  userIds: number[];
}

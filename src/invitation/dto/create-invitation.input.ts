import {InputType, Int, Field} from '@nestjs/graphql';

@InputType()
export class CreateInvitationInput {
  @Field()
  receiverId: number;
}

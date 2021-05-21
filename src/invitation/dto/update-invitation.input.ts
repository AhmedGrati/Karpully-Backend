import { CreateInvitationInput } from './create-invitation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInvitationInput extends PartialType(CreateInvitationInput) {
  @Field(() => Int)
  id: number;
}

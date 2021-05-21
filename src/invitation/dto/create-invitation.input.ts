import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInvitationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

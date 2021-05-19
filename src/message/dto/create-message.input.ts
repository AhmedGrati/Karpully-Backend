import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

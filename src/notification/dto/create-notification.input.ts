import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

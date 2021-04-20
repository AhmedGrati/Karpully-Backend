import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAhmedInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGovInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

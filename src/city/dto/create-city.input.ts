import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCityInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

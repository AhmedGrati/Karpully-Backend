import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConnectionHistoricInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

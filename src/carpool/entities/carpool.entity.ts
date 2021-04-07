import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Carpool {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

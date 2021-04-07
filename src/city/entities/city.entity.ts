import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class City {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

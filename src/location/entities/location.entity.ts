import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

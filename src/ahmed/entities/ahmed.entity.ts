import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Ahmed {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Chat {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

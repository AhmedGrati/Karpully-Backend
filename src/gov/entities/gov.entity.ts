import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Gov {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

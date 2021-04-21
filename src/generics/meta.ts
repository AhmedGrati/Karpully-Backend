import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Meta {
  @Field()
  itemCount: number;

  @Field()
  currentPage: number;
}

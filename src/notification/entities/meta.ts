import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class NotificationMeta {
  @Field()
  carpoolId: number;

  @Field()
  userId: number;
}

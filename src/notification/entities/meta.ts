import {Field, ObjectType} from '@nestjs/graphql';
import {Column} from 'typeorm';

@ObjectType()
export class NotificationMeta {
  @Field()
  @Column()
  carpoolId: number;

  @Field()
  @Column()
  userId: number;
}

import {Field, ObjectType} from '@nestjs/graphql';
import {Column} from 'typeorm';

@ObjectType()
export class NotificationMeta {
  @Field({nullable: true})
  @Column({nullable: true})
  carpoolId?: number;

  @Field()
  @Column()
  userId: number;
}

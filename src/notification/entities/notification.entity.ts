import {ObjectType, Field, Int, InputType} from '@nestjs/graphql';
import {TimestampEntites} from '../../generics/timestamp.entity';
import {User} from '../../user/entities/user.entity';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {NotificationMeta} from './meta';
import {NotificationTypeEnum} from './notification-type.enum';

@ObjectType()
@Entity()
export class Notification extends TimestampEntites {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications, {
    eager: true,
  })
  receiver: User;

  @Field()
  @Column()
  content: string;

  @Field(() => NotificationMeta)
  @Column((type) => NotificationMeta)
  meta: NotificationMeta;

  @Column({
    type: 'enum',
    enum: NotificationTypeEnum,
    nullable: false,
  })
  @Field((type) => NotificationTypeEnum)
  type: NotificationTypeEnum;
}

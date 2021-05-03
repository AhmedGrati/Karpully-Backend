import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { TimestampEntites } from '../../generics/timestamp.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}

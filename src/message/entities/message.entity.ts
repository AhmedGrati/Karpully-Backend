import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Chat} from '../../chat/entities/chat.entity';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../user/entities/user.entity';
import {TimestampEntites} from '../../generics/timestamp.entity';

@ObjectType()
@Entity()
export class Message extends TimestampEntites {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Chat)
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentMessages, {eager: true})
  sender: User;

  @Field(() => Boolean)
  @Column({default: false})
  isRead: boolean;

  @Field()
  @Column({nullable: false})
  content: string;
}

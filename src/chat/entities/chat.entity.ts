import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Message} from '../../message/entities/message.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class Chat {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Message], {nullable: true})
  @OneToMany(() => Message, (message) => message.chat, {
    nullable: true,
    eager: true,
  })
  messages?: Message[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.chats, {eager: true})
  @JoinTable()
  users: User[];
}

import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Message} from '../../message/entities/message.entity';
import {
  Entity,
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

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.chat, {
    nullable: true,
  })
  messages?: Message[];

  @Field(() => User)
  @ManyToMany(() => User, (user) => user.chats)
  users: User;
}

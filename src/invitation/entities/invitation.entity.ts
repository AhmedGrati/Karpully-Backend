import {ObjectType, Field, Int} from '@nestjs/graphql';
import {User} from '../../user/entities/user.entity';
import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@ObjectType()
@Entity()
export class Invitation {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentInvitations)
  sender: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.receivedInvitations)
  receiver: User;
}

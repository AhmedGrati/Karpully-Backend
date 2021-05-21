import {ObjectType, Field, Int} from '@nestjs/graphql';
import {User} from '../../user/entities/user.entity';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {InvitationStatusEnum} from './invitation-status.enum';

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

  @Column({
    type: 'enum',
    enum: InvitationStatusEnum,
    default: InvitationStatusEnum.PENDING,
  })
  @Field((type) => InvitationStatusEnum)
  status: InvitationStatusEnum;
}

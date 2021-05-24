import {ObjectType, Field, Int} from '@nestjs/graphql';
import {User} from '../../user/entities/user.entity';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {InvitationStatusEnum} from './invitation-status.enum';
import {TimestampEntites} from '../../generics/timestamp.entity';

@ObjectType()
@Entity()
export class Invitation extends TimestampEntites {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentInvitations, {eager: true})
  sender: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.receivedInvitations, {eager: true})
  receiver: User;

  @Column({
    type: 'enum',
    enum: InvitationStatusEnum,
    default: InvitationStatusEnum.PENDING,
  })
  @Field((type) => InvitationStatusEnum)
  status: InvitationStatusEnum;
}

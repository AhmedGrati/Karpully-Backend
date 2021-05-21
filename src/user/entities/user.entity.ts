import {ProfileImgUpload} from './../../profile-img-upload/entities/profile-img-upload.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  Field,
  HideField,
  ID,
  InputType,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import {Gender} from './gender';
import * as bcrypt from 'bcrypt';
import {
  IsEmail,
  IsNotEmpty,
  isNotEmpty,
  IsPhoneNumber,
  Max,
  Min,
} from 'class-validator';
import {UserRoleEnum} from './user-role.enum';
import {Email} from '../../email/entities/email.entity';
import {Logger} from '@nestjs/common';
import {Carpool} from '../../carpool/entities/carpool.entity';
import {TimestampEntites} from '../../generics/timestamp.entity';
import {Submission} from '../../submission/entities/submission.entity';
import {Notification} from '../../notification/entities/notification.entity';
import {ConnectionHistoric} from '../../connection-historic/entities/connection-historic.entity';
import {Chat} from '../../chat/entities/chat.entity';
import {Message} from '../../message/entities/message.entity';
import {Invitation} from '../../invitation/entities/invitation.entity';

@Entity()
@ObjectType()
export class User extends TimestampEntites {
  @PrimaryGeneratedColumn()
  @Field((type) => Int, {nullable: true})
  id: number;

  @Column({unique: true})
  @Field()
  username: string;

  @Column({nullable: true})
  @Field({nullable: true})
  firstname: string;

  @Column({nullable: true})
  @Field({nullable: true})
  lastname: string;

  @Field()
  @Column({default: false})
  completedSignUp: boolean;

  @Column({nullable: true})
  @Field({nullable: true})
  age: number;

  @Column({default: 0.0})
  @Field({nullable: true})
  @Min(0)
  @Max(5)
  rate: number;

  @Column({unique: true})
  @Field()
  @IsEmail()
  email: string;

  @Column()
  @HideField()
  salt: string;

  @Column({nullable: true})
  @Field({nullable: true})
  localization: string;

  @Column({nullable: true})
  @Field({nullable: true})
  @IsPhoneNumber()
  telNumber: string;

  @Column()
  @HideField()
  password: string;

  @Column('text', {array: true, default: null, nullable: true})
  @Field(() => [String], {nullable: true})
  authorities: string[];

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: [UserRoleEnum.USER],
    array: true,
    nullable: true,
  })
  @Field((type) => [UserRoleEnum])
  roles: string[];

  @Column({nullable: true})
  @Field((type) => Gender)
  gender: Gender;

  @Column({unique: true})
  @Field()
  lowerCasedUsername: string;

  @Column({default: false})
  @Field()
  isConfirmed: boolean;

  @OneToMany(() => Email, (email) => email.sender)
  @Field((type) => [Email], {nullable: true})
  sentEmails: [Email];

  @OneToMany(() => Carpool, (carpool) => carpool.owner)
  @Field((type) => [Carpool], {nullable: true})
  carpools: Carpool[];

  @Field((type) => [Submission], {nullable: true})
  @OneToMany((type) => Submission, (submission) => submission.owner)
  submissions: Submission[];

  @Field((type) => [Notification], {nullable: true})
  @OneToMany((type) => Notification, (notification) => notification.receiver)
  notifications: Notification[];

  @Field((type) => ConnectionHistoric, {nullable: true})
  @OneToOne((type) => ConnectionHistoric, (historic) => historic.owner, {
    cascade: true,
  })
  historic: ConnectionHistoric;

  @Field((type) => [Chat], {nullable: true})
  chats?: Chat[];

  @Field((type) => [Message], {nullable: true})
  @OneToMany((type) => Message, (message) => message.sender)
  sentMessages: Message[];

  @Field({nullable: true})
  @OneToOne((type) => ProfileImgUpload, {eager: true})
  @JoinColumn()
  profileImage: ProfileImgUpload;

  @Field(() => [User], {nullable: true})
  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: Promise<User[]>;

  @Field(() => Invitation)
  @OneToMany(() => Invitation, (invitation) => invitation.sender)
  sentInvitations;

  @Field(() => Invitation)
  @OneToMany(() => Invitation, (invitation) => invitation.receiver)
  receivedInvitations;

  @BeforeInsert()
  async hashPassword() {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}

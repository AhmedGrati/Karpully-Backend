import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {Field, HideField, ID, Int, ObjectType} from '@nestjs/graphql';
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

@Entity()
@ObjectType()
export class User extends TimestampEntites {
  @PrimaryGeneratedColumn()
  @Field((type) => Int, {nullable: true})
  id: number;

  @Column({unique: true})
  @Field()
  username: string;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Field()
  @Column()
  completedSignUp: boolean;

  @Column()
  @Field()
  age: number;

  @Column({default: 0.0})
  @Field()
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

  @Column()
  @Field()
  localization: string;

  @Column()
  @Field()
  @IsPhoneNumber()
  telNumber: string;

  @Column()
  @HideField()
  password: string;

  @Column('text', {array: true, default: null})
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

  @Column()
  @Field((type) => Gender)
  gender: Gender;

  @Column({unique: true})
  @Field()
  lowerCasedUsername: string;

  @Column({default: false})
  @Field()
  isConfirmed: boolean;

  @OneToMany(() => Email, (email) => email.sender)
  @Field((type) => [Email])
  sentEmails: [Email];

  @OneToMany(() => Carpool, (carpool) => carpool.owner)
  @Field((type) => [Carpool])
  carpools: Carpool[];

  @Field((type) => [Submission])
  @OneToMany((type) => Submission, (submission) => submission.owner)
  submissions: Submission[];

  @Field((type) => [Notification])
  @OneToMany((type) => Notification, (notification) => notification.receiver)
  notifications: Notification[];

  @BeforeInsert()
  async hashPassword() {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}

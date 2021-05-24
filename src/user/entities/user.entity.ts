import { ProfileImgUpload } from './../../profile-img-upload/entities/profile-img-upload.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';

import { Field, HideField, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Gender } from './gender';
import * as bcrypt from 'bcrypt';
import {
  IsEmail,
  IsNotEmpty,
  isNotEmpty,
  IsPhoneNumber,
  Max,
  Min,
} from 'class-validator';
import { UserRoleEnum } from './user-role.enum';
import { Email } from '../../email/entities/email.entity';
import { Logger } from '@nestjs/common';
import { Carpool } from '../../carpool/entities/carpool.entity';
import { TimestampEntites } from '../../generics/timestamp.entity';
import { Submission } from '../../submission/entities/submission.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { ConnectionHistoric } from '../../connection-historic/entities/connection-historic.entity';

@Entity()
@ObjectType()
export class User extends TimestampEntites {
  @PrimaryGeneratedColumn()
  @Field((type) => Int, { nullable: true })
  id: number;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastname: string;

  @Field()
  @Column({ default: false })
  completedSignUp: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  age: number;

  @Column({ default: 0.0 })
  @Field({ nullable: true })
  @Min(0)
  @Max(5)
  rate: number;

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column()
  @HideField()
  salt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  localization: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @IsPhoneNumber()
  telNumber: string;

  @Column()
  @HideField()
  password: string;

  @Column('text', { array: true, default: null, nullable: true })
  @Field(() => [String], { nullable: true })
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

  @Column({ nullable: true })
  @Field((type) => Gender)
  gender: Gender;

  @Column({ unique: true })
  @Field()
  lowerCasedUsername: string;

  @Column({ default: false })
  @Field()
  isConfirmed: boolean;

  @OneToMany(() => Email, (email) => email.sender)
  @Field((type) => [Email], { nullable: true })
  sentEmails: [Email];

  @OneToMany(() => Carpool, (carpool) => carpool.owner)
  @Field((type) => [Carpool], { nullable: true })
  carpools: Carpool[];

  @Field((type) => [Submission], { nullable: true })
  @OneToMany((type) => Submission, (submission) => submission.owner)
  submissions: Submission[];

  @Field((type) => [Notification], { nullable: true })
  @OneToMany((type) => Notification, (notification) => notification.receiver)
  notifications: Notification[];

  @Field((type) => ConnectionHistoric, { nullable: true })
  @OneToOne((type) => ConnectionHistoric, (historic) => historic.owner, {
    cascade: true,
  })
  historic: ConnectionHistoric;

  @Field({ nullable: true })
  @ManyToOne(() => ProfileImgUpload, (img) => img.users, { eager: true })
  @JoinColumn()
  profileImage: ProfileImgUpload;
  @BeforeInsert()
  async hashPassword() {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}

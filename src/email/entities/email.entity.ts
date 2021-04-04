import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EmailTypeEnum } from './email-type.enum';
import { EmailBuilder } from './email.builder';

@ObjectType()
@Entity()
export class Email implements EmailBuilder {

  @PrimaryGeneratedColumn()
  @Field(type => Int,{nullable:true})
  id: number;

  @Column({type: 'timestamptz'})
  @Field()
  sentDate: Date;

  @Column()
  @Field(type => EmailTypeEnum)
  emailType: EmailTypeEnum;

  @ManyToOne(() => User, user => user.sentEmails)
  @Field(type => User)
  sender: User;

  setSender(user: User): Email {
    this.sender = user;
    return this;
  }
  setDate(date: Date): Email {
    this.sentDate = date;
    return this;
  }
  setEmailType(emailType: EmailTypeEnum): Email {
    this.emailType = emailType;
    return this;
  }


}

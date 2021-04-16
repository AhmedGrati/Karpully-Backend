import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.enum';
import { Carpool } from '../../carpool/entities/carpool.entity';
import { TimestampEntites } from '../../generics/timestamp.entity';

@ObjectType()
@Entity()
export class Submission extends TimestampEntites{
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

 @Column(
        {
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
        nullable:true,
        }
  )
  @Field()
  status: string;

  @Field(type => User)
  @ManyToOne(() => User, user => user.submissions, {
    eager: true,
    nullable: false
  })
  owner: User;

  
  @Field(type => Carpool)
  @ManyToOne(() => Carpool, carpool => carpool.submissions, {
    eager: true,
    nullable: false
  })
  carpool: Carpool;
  
}

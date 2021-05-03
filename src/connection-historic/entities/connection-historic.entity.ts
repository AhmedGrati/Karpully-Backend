import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Connection } from '../../connection/entities/connection.entity';
import { TimestampEntites } from '../../generics/timestamp.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class ConnectionHistoric extends TimestampEntites {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Connection, (connection) => connection.historic, {
    eager: true,
  })
  @Field(() => [Connection])
  connections: Connection[];

  @OneToOne(() => User, (user) => user.historic)
  @Field(() => User)
  @JoinColumn()
  owner: User;
}

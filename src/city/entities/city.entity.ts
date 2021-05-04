import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gov } from '../../gov/entities/gov.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carpool } from '../../carpool/entities/carpool.entity';
import { TimestampEntites } from '../../generics/timestamp.entity';

@ObjectType()
@Entity()
export class City extends TimestampEntites {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  cityName: string;

  @ManyToOne(() => Gov, (gov) => gov.cities, { eager: true })
  @Field((type) => Gov, { nullable: false })
  gov: Gov;

  // @OneToMany(() => Carpool, (carpool) => carpool.departureCity)
  // @Field((type) => [Carpool])
  // carpools: Carpool[];
}

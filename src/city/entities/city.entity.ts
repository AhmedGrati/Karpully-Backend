import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gov } from '../../gov/entities/gov.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class City {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({nullable:false})
  cityName:string;

  @ManyToOne(() => Gov, gov => gov.cities, {eager: true})
  @Field(type => Gov, {nullable:false})
  gov: Gov;
}

import { Carpool } from '../../carpool/entities/carpool.entity';
import { Address } from './address.entity';
import { ObjectType, Field, Int, registerEnumType, InputType, Float } from '@nestjs/graphql';
import { AfterInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum OSM {
  WAY = "way",
  NODE = "node",
  RELATION = "relation"
}
registerEnumType(OSM, {
  name: 'OSM',
});

@ObjectType()
@Entity()
export class Location {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  place_id: number;

  @Field()
  @Column({ nullable: true })
  licence: string;

  @Field()
  @Column({
    type: "enum",
    enum: OSM,
    nullable: false
  })
  osm_type: OSM;

  @Field()
  @Column({ nullable: true })
  osm_id: string;

  @Field(type => [String])
  @Column({ array: true })
  boundingbox?: string | null;

  @Field()
  @Column({ length: 200 })
  lat: string;

  @Field()
  @Column({ length: 200 })
  lon: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  display_name: string;

  @Field()
  @Column({ nullable: true })
  class?: string;

  @Field()
  @Column({ nullable: true })
  type?: string;

  @Field()
  @Column('float', { nullable: true })
  importance?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  icon?: string;

  @Field(type => Address)
  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address?: Address;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 0 })
  visited: number;

  @OneToMany(() => Carpool, carpool => carpool.departureLocation)
  departureCarpools: Carpool[];
  @OneToMany(() => Carpool, carpool => carpool.destinationLocation)
  destinationCarpools: Location[];
}

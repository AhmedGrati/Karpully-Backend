import { BadRequestException } from '@nestjs/common';
import { Carpool } from '../../carpool/entities/carpool.entity';
import { Address } from './address.entity';
import { ObjectType, Field, Int, registerEnumType, InputType, Float } from '@nestjs/graphql';
import { AfterInsert, BeforeInsert, Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { LATITUDE_OUT_OF_BORDER_MESSAGE, LONGITUDE_OUT_OF_BORDER_MESSAGE } from '../../utils/constants';

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

  @BeforeInsert()
  checkInformationRelativityToTunisia() {
    const limits = {
      lat_min: 30.230236,
      lat_max: 37.7612052,
      lon_min: 7.5219807,
      lon_max: 11.8801133
    }
    const lat = parseInt(this.lat, 10)
    const lon = parseInt(this.lon, 10)
    if (lat < limits.lat_min || lat > limits.lat_max) throw new BadRequestException(LATITUDE_OUT_OF_BORDER_MESSAGE)
    if (lon < limits.lon_min || lon > limits.lon_max) throw new BadRequestException(LONGITUDE_OUT_OF_BORDER_MESSAGE)
  }
}

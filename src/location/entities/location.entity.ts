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
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  place_id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  licence: string;

  @Field({ nullable: true })
  @Column({
    type: "enum",
    enum: OSM,
    nullable: false
  })
  osm_type: OSM;

  @Field({ nullable: true })
  @Column({ nullable: true })
  osm_id: string;

  @Field(type => [String], { nullable: true })
  @Column({ array: true })
  boundingbox?: string | null;

  @Field({ nullable: true })
  @Column({ type: "double precision" })
  lat: number;

  @Field({ nullable: true })
  @Column({ type: "double precision" })
  lon: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  display_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  class?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  @Column('float', { nullable: true })
  importance?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  icon?: string;

  @Field(type => Address, { nullable: true })
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
    const lat = this.lat
    const lon = this.lon
    if (lat < xy_limits.lat_min || lat > xy_limits.lat_max) throw new BadRequestException(LATITUDE_OUT_OF_BORDER_MESSAGE)
    if (lon < xy_limits.lon_min || lon > xy_limits.lon_max) throw new BadRequestException(LONGITUDE_OUT_OF_BORDER_MESSAGE)
  }
}
export const xy_limits = {
  lat_min: 30.230236,
  lat_max: 37.7612052,
  lon_min: 7.5219807,
  lon_max: 11.8801133
}

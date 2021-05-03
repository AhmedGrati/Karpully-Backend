import { Address } from './address.entity';
import { ObjectType, Field, Int, registerEnumType, InputType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  lat: string;

  @Field()
  @Column()
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
  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address?: Address;

  @Field({ nullable: true })
  @Column({ nullable: true })
  visited: number;
}

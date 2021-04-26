import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum OSM {
  WAY = "way",
  NODE = "node",
  RELATION = "relation"
}
@ObjectType()
@Entity()
export class Location {
  @Field(() => Int)
  @PrimaryColumn()
  place_id: string;

  @Field()
  @Column({ nullable: false })
  licence: string;

  @Field()
  @Column({
    type: "enum",
    enum: OSM,
    nullable: false
  })
  osm_type: OSM;

  @Field()
  @Column({ nullable: false })
  osm_id: string;

  @Field()
  @Column("string", { array: true })
  boundingbox?: (string)[] | null;

  @Field()
  @Column({ nullable: false })
  lat: string;

  @Field()
  @Column({ nullable: false })
  lon: string;

  @Field()
  @Column({ nullable: false })
  display_name: string;

  @Field()
  @Column({ nullable: false })
  class: string;

  @Field()
  @Column({ nullable: false })
  type: string;

  @Field()
  @Column({ nullable: false })
  importance: number;

  @Field()
  @Column({ nullable: false })
  icon: string;

}

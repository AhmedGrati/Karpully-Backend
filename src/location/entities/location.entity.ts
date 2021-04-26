import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
  @PrimaryColumn()
  place_id: string;

  @Field()
  @Column()
  licence: string;

  @Field()
  @Column({
    type: "enum",
    enum: OSM,
    nullable: false
  })
  osm_type: OSM;

  @Field()
  @Column()
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

  @Field()
  @Column()
  display_name: string;

  @Field()
  @Column()
  class: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  importance: number;

  @Field()
  @Column()
  icon: string;

}

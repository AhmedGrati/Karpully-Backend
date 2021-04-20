import {ObjectType, Field, Int} from '@nestjs/graphql';
import {City} from '../../city/entities/city.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TimestampEntites} from '../../generics/timestamp.entity';

@ObjectType()
@Entity()
export class Gov extends TimestampEntites {
  @Field((type) => Int, {nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  @Field({nullable: false})
  govName: string;

  @OneToMany(() => City, (city) => city.gov)
  @Field((type) => [City])
  cities: [City];
}

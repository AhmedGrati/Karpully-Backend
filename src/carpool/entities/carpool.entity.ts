import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gov } from '../../gov/entities/gov.entity';
import { Check, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { User } from '../../user/entities/user.entity';

/*
  constraints:
  1- Departure city should not be the same as the destination city.
  2- The departure date should be greater than current date.
*/
@ObjectType()
@Entity()
@Check(`"departureCityId" != "destinationCityId"`)
@Check(`"departureDate" >= current_timestamp`)
export class Carpool {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => Date)
  @Column({type: 'timestamptz'})
  departureDate: Date;

  @Field()
  @Column()
  nbrOfAvailablePlaces: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  hasSmokePermission: boolean;

  @Field(type => City)
  @ManyToOne(() => City, city=> city.carpools, {
    eager: true
  })
  departureCity: City;

  @Field(type => City)
  @ManyToOne(() => City,city  => city.carpools, {
    eager:true
  })
  destinationCity: City;

  @Field(type => User)
  @ManyToOne(() => User, user => user.carpools, {
    eager: true
  })
  owner: User;
  

}

import {Location} from './../../location/entities/location.entity';
import {ObjectType, Field, Int, InputType} from '@nestjs/graphql';
import {Gov} from '../../gov/entities/gov.entity';
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {City} from '../../city/entities/city.entity';
import {User} from '../../user/entities/user.entity';
import {Max, Min} from 'class-validator';
import {TimestampEntites} from '../../generics/timestamp.entity';
import {Submission} from '../../submission/entities/submission.entity';
import {DatesOperations} from '../../utils/dates-operation';
import {BadRequestException} from '@nestjs/common';
import {DEPARTURE_DATE_ERROR_MESSAGE} from '../../utils/constants';

/*
  constraints:
  1- Departure city should not be the same as the destination city.
  2- The departure date should be greater than current date.
*/
@ObjectType()
@Entity()
// @Check(`"departureLocation" != "destinationLocation"`)
@Check(`"departureDate" >= current_timestamp`)
export class Carpool extends TimestampEntites {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Date)
  @Column({type: 'timestamptz'})
  departureDate: Date;

  @Field()
  @Max(4)
  @Min(1)
  @Column()
  nbrOfAvailablePlaces: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  hasSmokePermission: boolean;

  @Field((type) => Location)
  @ManyToOne(() => Location, (location) => location.departureCarpools, {
    eager: true,
  })
  departureLocation: Location;

  @Field((type) => Location)
  @ManyToOne(() => Location, (location) => location.destinationCarpools, {
    eager: true,
  })
  destinationLocation: Location;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.carpools, {
    eager: true,
    nullable: false,
  })
  owner: User;

  @Field((type) => Submission)
  @OneToMany((type) => Submission, (submission) => submission.carpool)
  submissions: Submission[];

  @BeforeInsert()
  checkDepartureDateValidity() {
    const duration = DatesOperations.getDayDuration(
      new Date(),
      this.departureDate,
    );
    if (duration < 0) {
      throw new BadRequestException(DEPARTURE_DATE_ERROR_MESSAGE);
    }
  }
}

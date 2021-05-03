import { Location } from './../../location/entities/location.entity';
import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@InputType()
export class CreateCarpoolInput {
  @Field((type) => Date)
  departureDate: Date;

  @Field()
  nbrOfAvailablePlaces: number;

  @Field()
  description: string;

  @Field()
  hasSmokePermission: boolean;

  @Field()
  departureLocationLongitude: number;

  @Field()
  departureLocationLatitude: number

  @Field()
  destinationLocationLongitude: number;

  @Field()
  destinationLocationLatitude: number;

  @Field()
  ownerId: number;
}

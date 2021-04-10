import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCarpoolInput {

  @Field(type => Date)
  departureDate: Date;

  @Field()
  nbrOfAvailablePlaces: number;

  @Field()
  description: string;

  @Field()
  hasSmokePermission: boolean;

  @Field(type => Number)
  departureCityId: number;

  @Field(type => Number)
  destinationCityId: number;
  
}

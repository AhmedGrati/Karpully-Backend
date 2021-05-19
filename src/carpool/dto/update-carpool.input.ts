import {CreateCarpoolInput} from './create-carpool.input';
import {InputType, Field, Int, PartialType, OmitType} from '@nestjs/graphql';

@InputType()
export class UpdateCarpoolInput extends PartialType(
  OmitType(CreateCarpoolInput, [
    'departureLocationLatitude',
    'departureLocationLongitude',
    'destinationLocationLatitude',
    'destinationLocationLongitude',
  ]),
) {
  @Field(() => Int)
  id: number;
}

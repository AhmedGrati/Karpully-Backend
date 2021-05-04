import { Location } from './../../location/entities/location.entity';
import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';
import { CreateCarpoolInput } from './create-carpool.input';

@InputType()
export class FakerCreateCarpoolInput extends (PartialType(
    OmitType(CreateCarpoolInput, ['departureLocationLongitude', 'departureLocationLatitude', 'destinationLocationLatitude', 'destinationLocationLongitude'])
)) {
    @Field()
    departureLocationPlaceId: number;

    @Field()
    destinationLocationPlaceId: number;


}
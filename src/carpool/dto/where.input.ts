import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateCarpoolInput } from './create-carpool.input';
import { UpdateCarpoolInput } from './update-carpool.input';

@InputType()
export class Where extends PartialType(
  OmitType(UpdateCarpoolInput, ['departureLocationLongitude', 'departureLocationLatitude', 'destinationLocationLongitude', 'destinationLocationLatitude']),
) { }

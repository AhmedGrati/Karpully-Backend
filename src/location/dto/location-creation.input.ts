import { Location } from './../entities/location.entity';
import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class LocationCreationInput extends PartialType(OmitType(Location, ['place_id', 'id', 'visited'])) { }
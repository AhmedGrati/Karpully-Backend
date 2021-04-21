import {CreateCarpoolInput} from './create-carpool.input';
import {InputType, Field, Int, PartialType, OmitType} from '@nestjs/graphql';

@InputType()
export class UpdateCarpoolInput extends PartialType(CreateCarpoolInput) {
  @Field(() => Int)
  id: number;
}

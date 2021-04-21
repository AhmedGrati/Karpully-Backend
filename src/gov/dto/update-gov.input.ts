import {CreateGovInput} from './create-gov.input';
import {InputType, Field, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateGovInput extends PartialType(CreateGovInput) {
  @Field(() => Int)
  id: number;
}

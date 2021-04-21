import {InputType, Int, Field} from '@nestjs/graphql';
import {CreateGovInput} from '../../gov/dto/create-gov.input';
import {Gov} from '../../gov/entities/gov.entity';

@InputType()
export class CreateCityInput {
  @Field()
  cityName: string;

  @Field()
  govId: number;
}

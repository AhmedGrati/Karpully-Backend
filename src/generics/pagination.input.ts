import {Field, InputType} from '@nestjs/graphql';
import {Carpool} from '../carpool/entities/carpool.entity';
import {FindConditions} from 'typeorm';
import {OrderByDirection} from './ordery-by-direction';

@InputType()
export class PaginationInput {
  @Field()
  page: number;

  @Field()
  limit: number;

  @Field(() => OrderByDirection, {nullable: true})
  orderBy?: OrderByDirection;
}

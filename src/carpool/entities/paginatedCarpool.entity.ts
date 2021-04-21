import {Field, ObjectType} from '@nestjs/graphql';
import {Meta} from '../../generics/meta';
import {Carpool} from './carpool.entity';

@ObjectType()
export class PaginatedCarpool {
  @Field(() => [Carpool])
  items: Carpool[];

  @Field()
  meta: Meta;
}

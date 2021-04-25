import { CreateConnectionHistoricInput } from './create-connection-historic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateConnectionHistoricInput extends PartialType(CreateConnectionHistoricInput) {
  @Field(() => Int)
  id: number;
}

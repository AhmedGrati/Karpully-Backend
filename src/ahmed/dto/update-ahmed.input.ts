import { CreateAhmedInput } from './create-ahmed.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAhmedInput extends PartialType(CreateAhmedInput) {
  @Field(() => Int)
  id: number;
}

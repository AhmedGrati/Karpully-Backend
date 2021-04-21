import {InputType, Int, Field} from '@nestjs/graphql';

@InputType()
export class CreateGovInput {
  @Field()
  govName: string;
}

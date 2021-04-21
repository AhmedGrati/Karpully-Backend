import {InputType, Int, Field} from '@nestjs/graphql';

@InputType()
export class CreateSubmissionInput {
  @Field()
  carpoolId: number;
}

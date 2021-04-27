import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FindLocationByTextInput {
    @Field(() => String)
    text: string;
}

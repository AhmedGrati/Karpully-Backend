import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ReverseLocationSearchInput {
    @Field(() => Number)
    lat: number;
    @Field(() => Number)
    lon: number;
}

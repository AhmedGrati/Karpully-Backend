import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class XYLocation {
    @Field()
    lon: number;

    @Field()
    lat: number;

}

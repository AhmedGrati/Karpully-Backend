import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ReverseLocationSearchInput {
    constructor(lon: number, lat: number) {
        this.lat = lat;
        this.lon = lon;
    }
    @Field(() => Number)
    lat: number;
    @Field(() => Number)
    lon: number;
}

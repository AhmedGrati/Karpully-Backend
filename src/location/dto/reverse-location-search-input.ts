import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ReverseLocationSearchInput {
    constructor(lon: string, lat: string) {
        this.lat = lat;
        this.lon = lon;
    }
    @Field()
    lat: string;
    @Field()
    lon: string;
}

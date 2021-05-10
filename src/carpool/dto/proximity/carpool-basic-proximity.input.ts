import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CarpoolBasicProximityInput {
    @Field()
    lat: number;
    @Field()
    lon: number;
    @Field()

    radius: number;
}
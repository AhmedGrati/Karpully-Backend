import { InputType, Field } from "@nestjs/graphql";
import { Min } from "class-validator";

@InputType()
export class CarpoolBasicProximityInput {
    @Field()
    lat: number;
    @Field()
    lon: number;
    @Field()
    radius: number;
}
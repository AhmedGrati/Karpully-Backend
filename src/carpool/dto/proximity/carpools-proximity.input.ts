import { InputType, Field } from "@nestjs/graphql";
import { CarpoolBasicProximityInput } from "./carpool-basic-proximity.input";

@InputType()
export class CarpoolsProximityInput {
    @Field((type) => CarpoolBasicProximityInput, { nullable: true })
    departureLoc?: CarpoolBasicProximityInput
    @Field((type) => CarpoolBasicProximityInput, { nullable: true })
    destinationLoc?: CarpoolBasicProximityInput;
}
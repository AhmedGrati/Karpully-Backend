import { Field, InputType } from "@nestjs/graphql";
import { Carpool } from "../carpool/entities/carpool.entity";
import { FindConditions } from "typeorm";
import { OrderBy } from "./ordery-by";

@InputType()
export class PaginationInput {
    @Field()
    page: number;

    @Field()
    limit: number;

    @Field(() => OrderBy, {nullable: true})
    orderBy?: OrderBy;

}
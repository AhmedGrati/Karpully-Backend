import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Links {
    @Field()
    first:string;
    @Field()
    previous: string;
    @Field()
    next: string;
    @Field()
    last: string;
}
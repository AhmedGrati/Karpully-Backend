import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TokenModel {
    @Field()
    access_token: string;
}
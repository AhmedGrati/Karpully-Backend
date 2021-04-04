import { Field, InputType } from "@nestjs/graphql";
import { TokensInterface } from "../../shared/types/tokens.interface";

@InputType()
export class ResetPasswordInput extends TokensInterface{
    @Field()
    email: string;

    @Field()
    password:string;
}
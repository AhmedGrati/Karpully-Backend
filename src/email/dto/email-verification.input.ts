import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class EmailVerificationInput {
    @Field()
    userId: number;

    @Field()
    token: string;

    @Field()
    verificationToken: string;
}
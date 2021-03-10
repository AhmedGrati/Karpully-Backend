import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field(type => ID)
    id: number;
}

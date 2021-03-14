import { Field, ID, InputType, ObjectType,Int } from "@nestjs/graphql";
import { IsEmail, IsPhoneNumber, Max, Min } from "class-validator";
import { Gender } from "../entities/gender";

@InputType()
export class CreateUserInput {
    @Field(type => Int,{nullable:true})
    id: number;

    @Field()
    username: string;

    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field()
    @Min(5)
    @Max(100)
    age: number;

    
    @Field({nullable:true})
    @Min(0)
    @Max(5)
    rate: number;

    
    @Field()
    @IsEmail()
    email: string;

    
    @Field()
    localization: string;

    
    @Field()
    @IsPhoneNumber()
    telNumber: string;

    
    @Field()
    password: string;

    
    @Field(() => [String],{nullable:true})
    authorities: string[];
    
    @Field(() => [String],{nullable:true})
    roles: string[];
    
    @Field()
    gender : Gender;
    
    @Field({nullable:true})
    resetToken: string;

}

import { Field, ID, InputType, ObjectType,Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, Max, Min } from "class-validator";
import { Gender } from "../entities/gender";

@InputType()
export class CreateUserInput {
    @Field(type => Int,{nullable:true})
    id: number;

    @Field()
    @IsNotEmpty()
    username: string;

    @Field()
    @IsNotEmpty()
    firstname: string;

    @Field()
    @IsNotEmpty()
    lastname: string;

    @Field()
    @Min(5)
    @Max(100)
    @IsNotEmpty()
    age: number;

    
    @Field({nullable:true})
    @Min(0)
    @Max(5)
    rate: number;

    
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    
    @Field()
    @IsNotEmpty()
    localization: string;

    
    @Field()
    @IsPhoneNumber()
    @IsNotEmpty()
    telNumber: string;

    
    @Field()
    @IsNotEmpty()
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

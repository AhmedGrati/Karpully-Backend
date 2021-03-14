import { Field, ID, InputType, ObjectType,Int } from "@nestjs/graphql";
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
    age: number;

    
    @Field({nullable:true})
    rate: number;

    
    @Field()
    email: string;

    
    @Field()
    localization: string;

    
    @Field()
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

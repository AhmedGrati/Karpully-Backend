import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import {Gender} from './gender';
import * as bcrypt from 'bcryptjs';
import { IsEmail, IsPhoneNumber, Max, Min } from "class-validator";
@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(type => Int,{nullable:true})
    id: number;

    @Column()
    @Field()
    username: string;

    @Column()
    @Field()
    firstname: string;

    @Column()
    @Field()
    lastname: string;

    @Column()
    @Field()
    @Min(5)
    @Max(100)
    age: number;

    
    @Column({default:0.0})
    @Field()
    @Min(0)
    @Max(5)
    rate: number;

    
    @Column()
    @Field()
    @IsEmail()
    email: string;

    
    @Column()
    @Field()
    localization: string;

    
    @Column()
    @Field()
    @IsPhoneNumber()
    telNumber: string;

    
    @Column()
    @Field()
    password: string;

    
    @Column("text",{array:true, default:null})
    @Field(() => [String], {nullable:true})
    authorities: string[];
    
    @Column("text",{array:true, default:null})
    @Field(() => [String],{nullable:true})
    roles: string[];
    
    @Column()
    @Field()
    gender : Gender;
    
    @Column({default:null})
    @Field({nullable:true})
    resetToken: string;


    constructor(id: number,
        username:string,
        firstname: string,
        lastname: string,
        age: number,
        email:string,
        rate:number,
        telNumber: string,
        password:string,
        resetToken:string,
        gender:Gender,
        roles:string[],
        authorities:string[],
        localization:string) {
        this.id = id;
        this.username = username;
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
        this.email = email;
        this.rate = rate;
        this.telNumber = telNumber;
        this.password = password;
        this.resetToken = resetToken;
        this.gender = gender;
        this.roles = roles;
        this.authorities = authorities;
        this.localization = localization;
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

}

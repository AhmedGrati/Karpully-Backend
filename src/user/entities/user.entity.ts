import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Field, HideField, ID, Int, ObjectType } from "@nestjs/graphql";
import {Gender} from './gender';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, isNotEmpty, IsPhoneNumber, Max, Min } from "class-validator";
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
    @HideField()
    salt: string;

    
    @Column()
    @Field()
    localization: string;

    
    @Column()
    @Field()
    @IsPhoneNumber()
    telNumber: string;

    
    @Column()
    @HideField()
    password: string;

    
    @Column("text",{array:true, default:null})
    @Field(() => [String], {nullable:true})
    authorities: string[];
    
    @Column("text",{array:true, default:null})
    @Field(() => String,{nullable:true})
    role: string;
    
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
        salt: string,
        roles:string,
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
        this.role = roles;
        this.authorities = authorities;
        this.localization = localization;
        this.salt = salt;
    }

    @BeforeInsert()
    async hashPassword() {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
    }

}

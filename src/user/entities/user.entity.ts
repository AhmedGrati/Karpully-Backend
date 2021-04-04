import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Field, HideField, ID, Int, ObjectType } from "@nestjs/graphql";
import {Gender} from './gender';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, isNotEmpty, IsPhoneNumber, Max, Min } from "class-validator";
import { UserRoleEnum } from "./user-role.enum";
import { Email } from "../../email/entities/email.entity";


@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(type => Int,{nullable:true})
    id: number;

    @Column({unique:true})
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

    
    @Column({unique:true})
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
    
    @Column(
        {
        type: 'enum',
        enum: UserRoleEnum,
        default: [UserRoleEnum.USER],
        array:true,
        nullable:true,
        }
    )
    @Field(type => [UserRoleEnum])
    roles: string[];
    
    @Column()
    @Field(type=>Gender)
    gender : Gender;
    
    @Column({default:null})
    @Field({nullable:true})
    resetToken: string;

    @Column({default: false})
    @Field()
    isConfirmed: boolean;

    @OneToMany(() => Email, email => email.sender)
    @Field(type => [Email])
    sentEmails: [Email];


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
        roles:string[],
        authorities:string[],
        isConfirmed: boolean,
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
        this.salt = salt;
        this.isConfirmed = isConfirmed;
    }

    @BeforeInsert()
    async hashPassword() {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
    }

}

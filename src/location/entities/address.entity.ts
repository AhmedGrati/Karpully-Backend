import { ObjectType, Field, Int, registerEnumType, InputType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    @Field()
    ID: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    house_number: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    road: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    neighbourhood: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    hamlet: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    suburb: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    village: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    town: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    city_district: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    city: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    region: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    county: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    state_district: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    state: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    state_code: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    postcode: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    country: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    country_code: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    name: string;

}
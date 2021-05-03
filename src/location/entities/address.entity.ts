import { ObjectType, Field, Int, registerEnumType, InputType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    @Field()
    ID: number;

    @Column()
    @Field({ nullable: true })
    house_number: number;

    @Column()
    @Field({ nullable: true })
    road: string;

    @Column()
    @Field({ nullable: true })
    neighbourhood: string;

    @Column()
    @Field({ nullable: true })
    hamlet: string;

    @Column()
    @Field({ nullable: true })
    suburb: string;

    @Column()
    @Field({ nullable: true })
    village: string;

    @Column()
    @Field({ nullable: true })
    town: string;

    @Column()
    @Field({ nullable: true })
    city_district: string;

    @Column()
    @Field({ nullable: true })
    city: string;

    @Column()
    @Field({ nullable: true })
    region: string;

    @Column()
    @Field({ nullable: true })
    county: string;

    @Column()
    @Field({ nullable: true })
    state_district: string;

    @Column()
    @Field({ nullable: true })
    state: string;

    @Column()
    @Field({ nullable: true })
    state_code: string;

    @Column()
    @Field({ nullable: true })
    postcode: string;

    @Column()
    @Field({ nullable: true })
    country: string;

    @Column()
    @Field({ nullable: true })
    country_code: string;

    @Column()
    @Field({ nullable: true })
    name: string;

}
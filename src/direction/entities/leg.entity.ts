import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Any } from 'typeorm';

@ObjectType()
export class Leg {
    @Field({ nullable: true })
    distance: number;

    @Field({ nullable: true })
    duration: number;

    @Field({ nullable: true })
    summary: string;

    @Field({ nullable: true })
    weight: number;
}

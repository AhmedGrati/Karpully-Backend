import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Leg } from './leg.entity';

@ObjectType()
export class Route {
    @Field({ nullable: true })
    geometry: string;

    @Field({ nullable: true })
    distance: number;

    @Field({ nullable: true })
    duration: number;

    @Field({ nullable: true })
    weight_name: string;

    @Field({ nullable: true })
    weight: number;

    @Field(() => [Leg], { nullable: true })
    legs: [Leg];

}
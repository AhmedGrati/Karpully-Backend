import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Waypoint {
    @Field({ nullable: true })
    hint: string;

    @Field({ nullable: true })
    distance: number;

    @Field({ nullable: true })
    name: string;

    @Field((type) => [Number], { nullable: true })
    location?: (number)[] | null

}
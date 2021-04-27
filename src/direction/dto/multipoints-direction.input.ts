import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class MultiPointsDirectionInput {
    @Field()
    points: [{ lon: number, lat: number }]

}

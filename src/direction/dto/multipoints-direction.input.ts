import { XYLocation } from './xylocation.input';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class MultiPointsDirectionInput {
    @Field(type => [XYLocation])
    points: [XYLocation]

}

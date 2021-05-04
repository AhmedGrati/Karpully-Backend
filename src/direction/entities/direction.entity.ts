import { Waypoint } from './waypoint.entity';
import { Route } from './route.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Direction {
  @Field({ nullable: true })
  code: string

  @Field((type) => [Route], { nullable: true })
  routes?: [Route] | null;

  @Field((type) => [Waypoint], { nullable: true })
  waypoints?: (Waypoint)[] | null;
}

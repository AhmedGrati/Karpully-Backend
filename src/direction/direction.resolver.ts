import { MultiPointsDirectionInput } from './dto/multipoints-direction.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DirectionService } from './direction.service';
import { Direction } from './entities/direction.entity';


@Resolver(() => Direction)
export class DirectionResolver {
  constructor(private readonly directionService: DirectionService) { }

  @Query(() => Direction, { name: 'multiPointsDirection' })
  multiPointsDirection(@Args('pointsArray') multiPointsDirectionInput: MultiPointsDirectionInput) {
    return this.directionService.multiPointsDirections(multiPointsDirectionInput)
  }

}

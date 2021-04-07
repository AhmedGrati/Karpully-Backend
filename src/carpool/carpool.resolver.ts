import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CarpoolService } from './carpool.service';
import { Carpool } from './entities/carpool.entity';
import { CreateCarpoolInput } from './dto/create-carpool.input';
import { UpdateCarpoolInput } from './dto/update-carpool.input';

@Resolver(() => Carpool)
export class CarpoolResolver {
  constructor(private readonly carpoolService: CarpoolService) {}

  @Mutation(() => Carpool)
  createCarpool(@Args('createCarpoolInput') createCarpoolInput: CreateCarpoolInput) {
    return this.carpoolService.create(createCarpoolInput);
  }

  @Query(() => [Carpool], { name: 'carpool' })
  findAll() {
    return this.carpoolService.findAll();
  }

  @Query(() => Carpool, { name: 'carpool' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.carpoolService.findOne(id);
  }

  @Mutation(() => Carpool)
  updateCarpool(@Args('updateCarpoolInput') updateCarpoolInput: UpdateCarpoolInput) {
    return this.carpoolService.update(updateCarpoolInput.id, updateCarpoolInput);
  }

  @Mutation(() => Carpool)
  removeCarpool(@Args('id', { type: () => Int }) id: number) {
    return this.carpoolService.remove(id);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AhmedService } from './ahmed.service';
import { Ahmed } from './entities/ahmed.entity';
import { CreateAhmedInput } from './dto/create-ahmed.input';
import { UpdateAhmedInput } from './dto/update-ahmed.input';

@Resolver(() => Ahmed)
export class AhmedResolver {
  constructor(private readonly ahmedService: AhmedService) {}

  @Mutation(() => Ahmed)
  createAhmed(@Args('createAhmedInput') createAhmedInput: CreateAhmedInput) {
    return this.ahmedService.create(createAhmedInput);
  }

  @Query(() => [Ahmed], { name: 'ahmed' })
  findAll() {
    return this.ahmedService.findAll();
  }

  @Query(() => Ahmed, { name: 'ahmed' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ahmedService.findOne(id);
  }

  @Mutation(() => Ahmed)
  updateAhmed(@Args('updateAhmedInput') updateAhmedInput: UpdateAhmedInput) {
    return this.ahmedService.update(updateAhmedInput.id, updateAhmedInput);
  }

  @Mutation(() => Ahmed)
  removeAhmed(@Args('id', { type: () => Int }) id: number) {
    return this.ahmedService.remove(id);
  }
}

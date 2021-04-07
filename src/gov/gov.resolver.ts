import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GovService } from './gov.service';
import { Gov } from './entities/gov.entity';
import { CreateGovInput } from './dto/create-gov.input';
import { UpdateGovInput } from './dto/update-gov.input';

@Resolver(() => Gov)
export class GovResolver {
  constructor(private readonly govService: GovService) {}

  @Mutation(() => Gov)
  createGov(@Args('createGovInput') createGovInput: CreateGovInput) {
    return this.govService.create(createGovInput);
  }

  @Query(() => [Gov], { name: 'gov' })
  findAll() {
    return this.govService.findAll();
  }

  @Query(() => Gov, { name: 'gov' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.govService.findOne(id);
  }

  @Mutation(() => Gov)
  updateGov(@Args('updateGovInput') updateGovInput: UpdateGovInput) {
    return this.govService.update(updateGovInput.id, updateGovInput);
  }

  @Mutation(() => Gov)
  removeGov(@Args('id', { type: () => Int }) id: number) {
    return this.govService.remove(id);
  }
}

import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {GovService} from './gov.service';
import {Gov} from './entities/gov.entity';
import {CreateGovInput} from './dto/create-gov.input';
import {UpdateGovInput} from './dto/update-gov.input';
import {UserRoleEnum} from '../user/entities/user-role.enum';
import {Auth} from '../shared/decorators/auth.decorator';

@Resolver(() => Gov)
export class GovResolver {
  constructor(private readonly govService: GovService) {}

  @Auth(UserRoleEnum.ADMIN)
  @Mutation(() => Gov)
  createGov(@Args('createGovInput') createGovInput: CreateGovInput) {
    return this.govService.create(createGovInput);
  }
  @Auth(UserRoleEnum.ADMIN)
  @Query(() => [Gov])
  findAllGovs(): Promise<Gov[]> {
    return this.govService.findAll();
  }

  @Query(() => Gov)
  @Auth(UserRoleEnum.ADMIN)
  findOneGov(@Args('id', {type: () => Int}) id: number): Promise<Gov> {
    return this.govService.findOne(id);
  }

  @Mutation(() => Gov)
  @Auth(UserRoleEnum.ADMIN)
  updateGov(@Args('updateGovInput') updateGovInput: UpdateGovInput) {
    return this.govService.update(updateGovInput.id, updateGovInput);
  }

  @Mutation(() => Gov)
  @Auth(UserRoleEnum.ADMIN)
  removeGov(@Args('id', {type: () => Int}) id: number): Promise<Gov> {
    return this.govService.remove(id);
  }
}

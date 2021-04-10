import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CarpoolService } from './carpool.service';
import { Carpool } from './entities/carpool.entity';
import { CreateCarpoolInput } from './dto/create-carpool.input';
import { UpdateCarpoolInput } from './dto/update-carpool.input';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { Auth } from '../shared/decorators/auth.decorator';
import { UserRoleEnum } from '../user/entities/user-role.enum';
import { Logger } from '@nestjs/common';

@Resolver(() => Carpool)
export class CarpoolResolver {
  constructor(private readonly carpoolService: CarpoolService) {}

  @Mutation(() => Carpool)
  @Auth(UserRoleEnum.USER)
  createCarpool(@CurrentUser() owner: User,@Args('createCarpoolInput') createCarpoolInput: CreateCarpoolInput): Promise<Carpool> {
    return this.carpoolService.create(owner,createCarpoolInput);
  }

  @Query(() => [Carpool])
  @Auth(UserRoleEnum.USER)
  findAllCarpools(): Promise<Carpool[]> {
    return this.carpoolService.findAll();
  }

  @Query(() => Carpool)
  findOneCarpool(@Args('id', { type: () => Int }) id: number): Promise<Carpool> {
    return this.carpoolService.findOne(id);
  }

  @Mutation(() => Carpool)
  @Auth(UserRoleEnum.USER)
  async updateCarpool(@CurrentUser() owner: User, @Args('updateCarpoolInput') updateCarpoolInput: UpdateCarpoolInput): Promise<Carpool> {
    return await this.carpoolService.update(owner,updateCarpoolInput.id, updateCarpoolInput);
  }

  @Mutation(() => Carpool)
  removeCarpool(@Args('id', { type: () => Int }) id: number): Promise<Carpool> {
    return this.carpoolService.remove(id);
  }

  @Mutation(() => Carpool)
  restoreCarpool(@Args('id', { type: () => Int }) id: number): Promise<Carpool> {
    return this.carpoolService.restoreCarpool(id);
  }
}

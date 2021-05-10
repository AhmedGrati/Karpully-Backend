import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {CarpoolService} from './carpool.service';
import {Carpool} from './entities/carpool.entity';
import {CreateCarpoolInput} from './dto/create-carpool.input';
import {UpdateCarpoolInput} from './dto/update-carpool.input';
import {CurrentUser} from '../shared/decorators/current-user.decorator';
import {User} from '../user/entities/user.entity';
import {Auth} from '../shared/decorators/auth.decorator';
import {UserRoleEnum} from '../user/entities/user-role.enum';
import {Logger} from '@nestjs/common';
import {PaginatedCarpool} from './entities/paginatedCarpool.entity';
import {PaginationInput} from '../generics/pagination.input';
import {Where} from './dto/where.input';
import {Arg} from 'type-graphql';
import {OrderByDirection} from '../generics/ordery-by-direction';
import {FakerCreateCarpoolInput} from './dto/faker-create-carpool.input';

@Resolver(() => Carpool)
export class CarpoolResolver {
  constructor(private readonly carpoolService: CarpoolService) {}
  // TODO: return current user arg after dev phase is done
  // @Mutation(() => Carpool)
  // // @Auth(UserRoleEnum.USER)
  // createCarpool(
  //   @CurrentUser() owner: User,
  //   @Args('createCarpoolInput') createCarpoolInput: CreateCarpoolInput
  // ): Promise<Carpool> {
  //   return this.carpoolService.create(owner, createCarpoolInput);
  // }
  @Mutation(() => Carpool)
  @Auth(UserRoleEnum.USER)
  createCarpool(
    @CurrentUser() owner: User,
    @Args('createCarpoolInput') createCarpoolInput: CreateCarpoolInput,
  ): Promise<Carpool> {
    return this.carpoolService.create(owner, createCarpoolInput);
  }

  @Query(() => Carpool, {name: 'carpool'})
  @Auth(UserRoleEnum.USER)
  findOneCarpool(@Args('id', {type: () => Int}) id: number): Promise<Carpool> {
    return this.carpoolService.findOne(id);
  }

  @Mutation(() => Carpool)
  @Auth(UserRoleEnum.USER)
  async updateCarpool(
    @CurrentUser() user: User,
    @Args('updateCarpoolInput') updateCarpoolInput: UpdateCarpoolInput,
  ): Promise<Carpool> {
    return await this.carpoolService.update(
      user,
      updateCarpoolInput.id,
      updateCarpoolInput,
    );
  }

  @Mutation(() => Carpool)
  @Auth(UserRoleEnum.USER)
  removeCarpool(
    @CurrentUser() user: User,
    @Args('id', {type: () => Int}) id: number,
  ): Promise<Carpool> {
    return this.carpoolService.remove(user, id);
  }

  @Mutation(() => Carpool)
  @Auth(UserRoleEnum.USER)
  restoreCarpool(
    @CurrentUser() user: User,
    @Args('id', {type: () => Int}) id: number,
  ): Promise<Carpool> {
    return this.carpoolService.restoreCarpool(user, id);
  }

  @Query(() => PaginatedCarpool, {name: 'carpools'})
  async paginatedCarpool(
    @Args('paginationInput') paginationInput: PaginationInput,
    @Args('where') where?: Where,
  ): Promise<PaginatedCarpool> {
    return await this.carpoolService.paginatedCarpools(paginationInput, where);
  }
}

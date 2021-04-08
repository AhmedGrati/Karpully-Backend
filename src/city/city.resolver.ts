import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CityService } from './city.service';
import { City } from './entities/city.entity';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';
import { Auth } from '../shared/decorators/auth.decorator';
import { UserRoleEnum } from '../user/entities/user-role.enum';
import { Logger } from '@nestjs/common';

@Resolver(() => City)
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Mutation(() => City)
  @Auth(UserRoleEnum.ADMIN)
  createCity(@Args('createCityInput') createCityInput: CreateCityInput): Promise<City> {
    return this.cityService.create(createCityInput);
  }

  @Query(() => [City])
  @Auth(UserRoleEnum.ADMIN)
  async findAllCities(): Promise<City[]> {
    const a = await this.cityService.findAll();
    Logger.log({a},"HEY")
    return a;
  }

  @Query(() => City)
  @Auth(UserRoleEnum.ADMIN)
  findOneCity(@Args('id', { type: () => Int }) id: number):Promise<City> {
    return this.cityService.findOne(id);
  }

  @Mutation(() => City)
  @Auth(UserRoleEnum.ADMIN)
  updateCity(@Args('updateCityInput') updateCityInput: UpdateCityInput): Promise<City> {
    return this.cityService.update(updateCityInput.id, updateCityInput);
  }

  @Mutation(() => City)
  @Auth(UserRoleEnum.ADMIN)
  removeCity(@Args('id', { type: () => Int }) id: number): Promise<City> {
    return this.cityService.remove(id);
  }
}

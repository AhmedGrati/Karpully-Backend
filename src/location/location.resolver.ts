import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { FindLocationByTextInput } from './dto/find-location-by-text.input';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) { }

  @Query(() => [Location], { name: 'findLocationByText' })
  findLocationByText(@Args('loc') findLocationByTextInput: FindLocationByTextInput) {
    return this.locationService.findLocationByText(findLocationByTextInput);
  }
  @Mutation(() => Location)
  createLocation(@Args('createLocationInput') createLocationInput: CreateLocationInput) {
    return this.locationService.create(createLocationInput);
  }


}

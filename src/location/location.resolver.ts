import { ReverseLocationSearchInput } from './dto/reverse-location-search-input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { FindLocationByTextInput } from './dto/find-location-by-text.input';
import { UserRoleEnum } from '../user/entities/user-role.enum';
import { Auth } from '../shared/decorators/auth.decorator';
import { AutocompleteInput } from './dto/autocomplete.input';
@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) { }

  // @Auth(UserRoleEnum.USER)
  @Query(() => [Location], { name: 'geoEncoding' })
  findLocationByText(@Args('loc') findLocationByTextInput: FindLocationByTextInput) {

    return this.locationService.findLocationByText(findLocationByTextInput);
  }

  // @Auth(UserRoleEnum.USER)
  @Query(() => [Location], { name: 'geoDecoding' })
  reverseSearchLocation(@Args('xy') reverseSearchLocationInput: ReverseLocationSearchInput) {
    return this.locationService.reverseSearchLocation(reverseSearchLocationInput);
  }

  // @Auth(UserRoleEnum.USER)
  @Query(() => [Location], { name: 'autocomplete' })
  autocomplete(@Args('textInput') autocompleteInput: AutocompleteInput) {
    return this.locationService.autocomplete(autocompleteInput);
  }
  // @Mutation(() => Location)
  // createLocation(@Args('createLocationInput') createLocationInput: CreateLocationInput) {
  //   return this.locationService.create(createLocationInput);
  // }


}

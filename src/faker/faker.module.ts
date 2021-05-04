import {Module} from '@nestjs/common';
import {FakeUserModule} from './fake-user/fake-user.module';
import {FakerCarpoolModule} from './faker-carpool/faker-carpool.module';
import {FakerCityModule} from './faker-city/faker-city.module';
import {FakerGovModule} from './faker-gov/faker-gov.module';
import {FakerService} from './faker.service';
import { FakerLocationModule } from './faker-location/faker-location.module';
import { FakerAddressModule } from './faker-address/faker-address.module';

@Module({
  providers: [FakerService],
  imports: [
    FakerCarpoolModule,
    FakerCityModule,
    FakeUserModule,
    FakerGovModule,
    FakerLocationModule,
    FakerAddressModule,
  ],
})
export class FakerModule {}

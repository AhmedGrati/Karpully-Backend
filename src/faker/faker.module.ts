import {Module} from '@nestjs/common';
import {FakeUserModule} from './fake-user/fake-user.module';
import {FakerCarpoolModule} from './faker-carpool/faker-carpool.module';
import {FakerCityModule} from './faker-city/faker-city.module';
import {FakerGovModule} from './faker-gov/faker-gov.module';
import {FakerService} from './faker.service';

@Module({
  providers: [FakerService],
  imports: [
    FakerCarpoolModule,
    FakerCityModule,
    FakeUserModule,
    FakerGovModule,
  ],
})
export class FakerModule {}

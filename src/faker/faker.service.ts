import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {FakeUserService} from './fake-user/fake-user.service';
import {FakerCarpoolService} from './faker-carpool/faker-carpool.service';
import {FakerCityService} from './faker-city/faker-city.service';
import {FakerGovService} from './faker-gov/faker-gov.service';

@Injectable()
export class FakerService implements OnApplicationBootstrap {
  constructor(
    private readonly fakerUserService: FakeUserService,
    private readonly fakerCarpoolService: FakerCarpoolService,
    private readonly fakerCityService: FakerCityService,
    private readonly fakerGovService: FakerGovService,
  ) {}
  async onApplicationBootstrap() {
    await this.fakerUserService.seed();
    await this.fakerGovService.seed();
    await this.fakerCityService.seed();
    await this.fakerCarpoolService.seed();
  }
}

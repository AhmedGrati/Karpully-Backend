import {Address} from './../../location/entities/address.entity';
import {LocationService} from '../../location/location.service';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {EnvironmentVariables} from '../..//common/EnvironmentVariables';
import {AddressCreationInput} from 'src/location/dto/address-creation.input';

const faker = require('faker');
@Injectable()
export class FakerAddressService {
  constructor(
    private locationService: LocationService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}
  async seed() {
    const seedNumber = this.configService.get<number>('SEED_NUMBER');
    const allAddress = await this.locationService.findAllAddress();
    if (allAddress.length < seedNumber) {
      return await Array.from({length: seedNumber}).map<
        Promise<Address | void>
      >(async () => {
        const house_number = faker.datatype.number({min: 1, max: 3500});
        const road = faker.lorem.word();
        const neighbourhood = faker.lorem.word();
        const hamlet = faker.lorem.word();
        const suburb = faker.lorem.word();
        const village = faker.address.county();
        const town = faker.address.county();
        const city_district = faker.lorem.word(2);
        const city = faker.address.city();
        const region = 'Tunisia';
        const county = faker.address.county();
        const state = faker.address.state();
        const state_code = faker.address.stateAbbr();
        const postcode = faker.address.zipCode('#####');
        const country = 'Tunisia';
        const country_code = 'TN';
        const name = faker.lorem.word();
        const add: AddressCreationInput = {
          house_number,
          road,
          neighbourhood,
          hamlet,
          suburb,
          village,
          town,
          city_district,
          city,
          region,
          county,
          state,
          state_code,
          postcode,
          country,
          country_code,
          name,
          state_district: '',
        };
        return await this.locationService.createAddress(add);
      });
    }
  }
}

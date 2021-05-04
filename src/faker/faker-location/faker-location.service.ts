import { LocationService } from '../../location/location.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../common/EnvironmentVariables';
import { Location } from '../../location/entities/location.entity'
import { LocationCreationInput } from '../../location/dto/location-creation.input';
const faker = require('faker')
@Injectable()
export class FakerLocationService {
    constructor(
        private readonly configService: ConfigService<EnvironmentVariables>,
        private readonly locationService: LocationService

    ) { }
    async seed() {
        const seedNumber = this.configService.get<number>('SEED_NUMBER');
        const allAddress = await this.locationService.findAllAddress();
        const allLocations = await this.locationService.findAll();
        if (allLocations.length < seedNumber) {
            return await Array.from({ length: seedNumber }).map<Promise<Location | void>>(
                async (_, i) => {
                    const licence = faker.lorem.word(3);
                    const osm_type = faker.random.arrayElement(['node', 'way', 'relation'])
                    const osm_id = faker.datatype.number();
                    const boundingbox = `{${faker.address.longitude()}, ${faker.address.longitude()} , ${faker.address.latitude()}, ${faker.address.latitude()} }`;
                    const lat = faker.address.latitude();
                    const lon = faker.address.longitude();
                    const display_name = faker.address.streetAddress(true);
                    const __class = faker.random.arrayElement(['tourism', 'industrial']);
                    const type = faker.lorem.word();
                    const importance = faker.datatype.number({ max: 50 }) / 50;
                    const icon = faker.image.image();
                    const __randomSelector = faker.datatype.number({ max: seedNumber - 1 });
                    const address = allAddress[i];
                    // console.log('******** Linking new faker location to address number ', i)
                    const loc: LocationCreationInput = {
                        licence,
                        osm_type,
                        osm_id,
                        boundingbox,
                        lat,
                        lon,
                        display_name,
                        class: __class,
                        type,
                        importance,
                        icon,
                        address,
                    };
                    return await this.locationService.create(loc)
                }
            )
        }
    }
}

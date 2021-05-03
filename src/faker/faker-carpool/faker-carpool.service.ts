import { Exception } from 'handlebars';
import { LocationService } from '../../location/location.service';
import { Injectable } from '@nestjs/common';
import { CarpoolService } from '../../carpool/carpool.service';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../common/EnvironmentVariables';
import { Carpool } from '../../carpool/entities/carpool.entity';
import { FakerCreateCarpoolInput } from '../../carpool/dto/faker-create-carpool.input';
const faker = require('faker');
@Injectable()
export class FakerCarpoolService {
  constructor(
    private readonly carpoolService: CarpoolService,
    private readonly userService: UserService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly locationService: LocationService
  ) { }
  async seed() {
    const seedNumber = this.configService.get<number>('SEED_NUMBER');
    const allLocations = await this.locationService.findAll()
    const allCarpools = await this.carpoolService.findAll();
    const allUsers = await this.userService.findAll();
    console.log(allUsers[0].id, '______________');
    if (allCarpools.length < seedNumber) {
      return await Array.from({ length: seedNumber }).map<Promise<Carpool | void>>(
        async (_, i) => {
          //
          const departureLocation = allLocations[i % seedNumber]
          const destinationLocation = allLocations[(i + 1) % seedNumber]
          const owner = allUsers[0];
          const hasSmokePermission: boolean = faker.random.arrayElement([
            true,
            false,
          ]);
          const description: string = 'This is a new Carpool!';
          const departureDate: Date = faker.date.future(2);
          const nbrOfAvailablePlaces: number = faker.datatype.number({
            min: 1,
            max: 4,
          }) as number;
          // const carpool: FakerCreateCarpoolInput = {
          //   nbrOfAvailablePlaces,
          //   description,
          //   hasSmokePermission,
          //   departureDate,
          //   departureLocationPlaceId,
          //   destinationLocationPlaceId,
          //   ownerId
          // };
          const carpool = this.carpoolService.CARPOOL_REPO.create({
            nbrOfAvailablePlaces,
            description,
            hasSmokePermission,
            departureDate,
          });
          this.carpoolService.CARPOOL_REPO.merge(carpool,
            { owner },
            { departureLocation },
            { destinationLocation }
          )
          return await this.carpoolService.createFake(carpool).catch(e => {
            throw new Exception('failed to created carpool ')
          });
        },
      );
    }
  }
}

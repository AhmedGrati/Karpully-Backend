import { Injectable } from '@nestjs/common';
import { CarpoolService } from '../../carpool/carpool.service';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../common/EnvironmentVariables';
import { Carpool } from '../../carpool/entities/carpool.entity';
import { CreateCarpoolInput } from '../../carpool/dto/create-carpool.input';
const faker = require('faker');
@Injectable()
export class FakerCarpoolService {
  constructor(
    private readonly carpoolService: CarpoolService,
    private readonly userService: UserService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) { }
  async seed() {
    const seedNumber = this.configService.get<number>('SEED_NUMBER');
    const allCarpools = await this.carpoolService.findAll();
    const allUsers = await this.userService.findAll();
    if (allCarpools.length < seedNumber) {
      return await Array.from({ length: seedNumber }).map<Promise<Carpool>>(
        async () => {

          const departureLocationLongitude: number = faker.address.longitude();
          const departureLocationLatitude: number = faker.address.latitude();
          const destinationLocationLongitude: number = faker.address.longitude();
          const destinationLocationLatitude: number = faker.address.latitude();
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
          const carpool: CreateCarpoolInput = {
            nbrOfAvailablePlaces,
            departureLocationLongitude,
            departureLocationLatitude,
            description,
            destinationLocationLongitude,
            destinationLocationLatitude,
            hasSmokePermission,
            departureDate,
          };

          return await this.carpoolService.create(owner, carpool);
        },
      );
    }
  }
}

import { LOCATION_NOT_FOUND_ERROR_MESSAGE, LOCATION_SAVE_ISSUE_ERROR_MESSAGE } from './../utils/constants';
import { LocationService } from './../location/location.service';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CARPOOL_NOT_FOUND_ERROR_MESSAGE,
  CITY_NOT_FOUND_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
} from '../utils/constants';
import {
  Repository,
} from 'typeorm';
import { CreateCarpoolInput } from './dto/create-carpool.input';
import { UpdateCarpoolInput } from './dto/update-carpool.input';
import { Carpool } from './entities/carpool.entity';
import { User } from '../user/entities/user.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';
import { PaginationInput } from '../generics/pagination.input';
import { PaginatedCarpool } from './entities/paginatedCarpool.entity';
import { Pagination } from '../utils/pagination';
import { Where } from './dto/where.input';
import { checkCASLAndExecute } from '../utils/casl-authority-check';
import { ReverseLocationSearchInput } from '../location/dto/reverse-location-search-input';
import { Location } from '../location/entities/location.entity'
import { Exception } from 'handlebars';
@Injectable()
export class CarpoolService {
  constructor(
    @InjectRepository(Carpool)
    private readonly carpoolRepository: Repository<Carpool>,
    private caslAbilityFactory: CaslAbilityFactory<Carpool>,
    private locationService: LocationService,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ) { }
  async create(owner: User, createCarpoolInput: CreateCarpoolInput) {
    const { departureLocationLongitude, departureLocationLatitude, destinationLocationLongitude, destinationLocationLatitude } = createCarpoolInput;
    // fetch locations from locationIQ
    const departureLocation = await this.locationService.reverseSearchLocation(new ReverseLocationSearchInput(departureLocationLongitude, departureLocationLatitude))
    const destinationLocation = await this.locationService.reverseSearchLocation(new ReverseLocationSearchInput(destinationLocationLongitude, destinationLocationLatitude))
    // Save location into the DB for future stats
    await this.locationRepository.save(departureLocation).then((e: Location) => {
      console.log('departure location object: ', e)
      if (!e) {
        throw new Exception(LOCATION_SAVE_ISSUE_ERROR_MESSAGE)
      }
    })
    await this.locationRepository.save(destinationLocation).then((e: Location) => {
      console.log('destination location object: ', e)
      if (!e) {
        throw new Exception(LOCATION_SAVE_ISSUE_ERROR_MESSAGE)
      }
    })

    if (owner && departureLocation && destinationLocation) {
      // create a new carpool
      const createdCarpool = await this.carpoolRepository.create(
        createCarpoolInput,
      );
      // assign the properties
      this.carpoolRepository.merge(
        createdCarpool,
        { owner },
        { departureLocation },
        { destinationLocation },
      );

      // save the created carpool
      return await this.carpoolRepository.save(createdCarpool);
    } else {
      if (!owner) {
        throw new NotFoundException(USER_NOT_FOUND_ERROR_MESSAGE);
      } else {
        throw new NotFoundException(CITY_NOT_FOUND_ERROR_MESSAGE);
      }
    }
  }

  async findAll(): Promise<Carpool[]> {
    return await this.carpoolRepository.find();
  }

  async findOne(id: number): Promise<Carpool> {
    const carpool = await this.carpoolRepository.findOne({ where: { id } });
    if (!carpool) {
      throw new NotFoundException(CARPOOL_NOT_FOUND_ERROR_MESSAGE);
    }
    return carpool;
  }

  async paginatedCarpools(
    paginationInput: PaginationInput,
    where: Where,
  ): Promise<PaginatedCarpool> {
    return await Pagination.paginate<Carpool>(
      this.carpoolRepository,
      paginationInput,
      where,
    );
  }

  async restoreCarpool(user: User, id: number): Promise<Carpool> {
    const executedFunction = checkCASLAndExecute(
      user,
      this.caslAbilityFactory,
      Action.Update,
      id,
      this.carpoolRepository,
      async () => {
        await this.carpoolRepository.restore(id);
        return await this.carpoolRepository.findOne({ where: { id } });
      },
    );

    return executedFunction;
  }

  async update(
    user: User,
    carpoolId: number,
    updateCarpoolInput: UpdateCarpoolInput,
  ): Promise<Carpool> {
    const executedFunction = checkCASLAndExecute(
      user,
      this.caslAbilityFactory,
      Action.Update,
      carpoolId,
      this.carpoolRepository,
      async () => {
        const { id, ...data } = updateCarpoolInput;
        await this.carpoolRepository
          .update(carpoolId, data)
          .then((updatedCarpool) => updatedCarpool.raw[0]);
        return await this.findOne(carpoolId);
      },
    );

    return executedFunction;
  }

  async updateCarpool(carpool: Carpool): Promise<Carpool> {
    return await this.carpoolRepository.save(carpool);
  }

  async remove(user: User, id: number): Promise<Carpool> {
    const executedFunction = checkCASLAndExecute(
      user,
      this.caslAbilityFactory,
      Action.Delete,
      id,
      this.carpoolRepository,
      async () => {
        const carpoolToRemove = await this.findOne(id);
        await this.carpoolRepository.softDelete(id);
        return carpoolToRemove;
      },
    );

    return executedFunction;
  }

  // async checkCASLAndExecute(user: User, action: Action, carpoolId: number, func: () => Promise<Carpool>): Promise<Carpool> {
  //   const carpool = await this.findOne(carpoolId);
  //   if(!carpool) {
  //     throw new UnauthorizedException(CARPOOL_NOT_FOUND_ERROR_MESSAGE);
  //   }else{
  //     const ability = this.caslAbilityFactory.createForUser(carpool, user);
  //     if(ability.can(action, Carpool)) {
  //       return func();
  //     } else {
  //       throw new UnauthorizedException(CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE);
  //     }
  //   }
  // }
}

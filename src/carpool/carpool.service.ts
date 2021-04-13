import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CARPOOL_NOT_FOUND_ERROR_MESSAGE, CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE, CITY_NOT_FOUND_ERROR_MESSAGE, USER_NOT_FOUND_ERROR_MESSAGE } from '../utils/constants';
import { FindConditions, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateCarpoolInput } from './dto/create-carpool.input';
import { UpdateCarpoolInput } from './dto/update-carpool.input';
import { Carpool } from './entities/carpool.entity';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';
import { User } from '../user/entities/user.entity';
import { City } from '../city/entities/city.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';
import { PaginationInput } from '../generics/pagination.input';
import { Meta } from '../generics/meta';
import { PaginatedCarpool } from './entities/paginatedCarpool.entity';
import {Pagination} from "../utils/pagination";
import { OrderBy } from '../generics/ordery-by';
@Injectable()
export class CarpoolService {
  constructor(@InjectRepository(Carpool) private readonly carpoolRepository: Repository<Carpool>,
  private readonly userService: UserService,
  private readonly cityService: CityService,
  private caslAbilityFactory: CaslAbilityFactory<Carpool>
  ) {}
  async create(owner: User, createCarpoolInput: CreateCarpoolInput) {
    const {departureCityId, destinationCityId} = createCarpoolInput;
    const departureCity = await this.cityService.findOne(departureCityId);
    const destinationCity = await this.cityService.findOne(destinationCityId);

    if(owner && departureCity && destinationCity) {
      // create a new carpool
      const createdCarpool = await this.carpoolRepository.create(createCarpoolInput);
      
      // assign the properties
      this.carpoolRepository.merge(createdCarpool, {owner}, {departureCity}, {destinationCity});

      // save the created carpool
      return await this.carpoolRepository.save(createdCarpool);
    } else {
      if(! owner) {
        throw new NotFoundException(USER_NOT_FOUND_ERROR_MESSAGE);
      }else {
        throw new NotFoundException(CITY_NOT_FOUND_ERROR_MESSAGE);
      }
    }
  }

  async findAll(): Promise<Carpool[]> {
    return await this.carpoolRepository.find();
  }

  async findOne(id: number): Promise<Carpool> {
    const carpool = await this.carpoolRepository.findOne({where:{id}});
    if(!carpool) {
      throw new NotFoundException(CARPOOL_NOT_FOUND_ERROR_MESSAGE);
    }
    return carpool;
  }

  async paginatedCarpools(paginationInput: PaginationInput): Promise<PaginatedCarpool> {

    return await Pagination.paginate<Carpool>(this.carpoolRepository, paginationInput,
      {
        hasSmokePermission: false,
      }
      ,
      {
        departureDate: OrderBy.DESC
      }
      );

  }

  async restoreCarpool(user: User, id: number): Promise<Carpool> {

    const executedFunction = this.checkCASLAndExecute(user, Action.Update, 
        id, async () => {
          await this.carpoolRepository.restore(id);
          return await this.carpoolRepository.findOne({where:{id}});
        }
    );
    
    return executedFunction;
    

  }

  async update(user: User, carpoolId: number, updateCarpoolInput: UpdateCarpoolInput): Promise<Carpool> {

    const executedFunction = this.checkCASLAndExecute(user, Action.Update, 
        carpoolId, async () => {
          const {id, ...data} = updateCarpoolInput;
          await this.carpoolRepository.update(carpoolId,data).then(updatedCarpool => updatedCarpool.raw[0]);
          return await this.findOne(carpoolId);
        }
    );
    
    return executedFunction;
    
    
  }

  async remove(user: User, id: number):Promise<Carpool> {

        const executedFunction = this.checkCASLAndExecute(user, Action.Delete, 
        id, async () => {
          const carpoolToRemove = await this.findOne(id);
          await this.carpoolRepository.softDelete(id);
          return carpoolToRemove;
        }
    );
    
    return executedFunction;
  }

  async checkCASLAndExecute(user: User, action: Action, carpoolId: number, func: () => Promise<Carpool>): Promise<Carpool> {
    const carpool = await this.findOne(carpoolId);
    if(!carpool) {
      throw new UnauthorizedException(CARPOOL_NOT_FOUND_ERROR_MESSAGE);
    }else{
      const ability = this.caslAbilityFactory.createForUser(carpool, user);
      if(ability.can(action, Carpool)) {
        return func();
      } else {
        throw new UnauthorizedException(CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE);
      }
    }
  }



}

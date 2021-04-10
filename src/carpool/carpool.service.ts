import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CARPOOL_NOT_FOUND_ERROR_MESSAGE, CITY_NOT_FOUND_ERROR_MESSAGE, USER_NOT_FOUND_ERROR_MESSAGE } from '../utils/constants';
import { Repository } from 'typeorm';
import { CreateCarpoolInput } from './dto/create-carpool.input';
import { UpdateCarpoolInput } from './dto/update-carpool.input';
import { Carpool } from './entities/carpool.entity';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CarpoolService {
  constructor(@InjectRepository(Carpool) private readonly carpoolRepository: Repository<Carpool>,
  private readonly userService: UserService,
  private readonly cityService: CityService
  ) {}
  create(owner: User, createCarpoolInput: CreateCarpoolInput) {
    return this.checkCarpoolAndSave(owner.id,createCarpoolInput);
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

  async update(owner: User, carpoolId: number, updateCarpoolInput: UpdateCarpoolInput): Promise<Carpool> {
    const {id, ...data} = updateCarpoolInput;
    const carpool = await this.findOne(carpoolId);
    if(!carpool) {
      throw new NotFoundException(CARPOOL_NOT_FOUND_ERROR_MESSAGE);
    }else{
      // if the user who's trying to update the carpool is not the owner of the carpool then it is forbidden to update it
      if(carpool.owner.id != owner.id) {
        throw new UnauthorizedException();
      }else{
        await this.carpoolRepository.update(carpoolId,data).then(updatedCarpool => updatedCarpool.raw[0]);
        return await this.findOne(carpoolId);
      }
    }
  }

  async remove(id: number):Promise<Carpool> {
    const carpoolToRemove = await this.findOne(id);
    await this.carpoolRepository.delete(id);
    return carpoolToRemove;
  }

  async checkCarpoolAndSave(ownerId: number,carpool: CreateCarpoolInput | UpdateCarpoolInput): Promise<Carpool> {
    const {departureCityId, destinationCityId} = carpool;
    const owner = await this.userService.internalFindOne(ownerId);
    const departureCity = await this.cityService.findOne(departureCityId);
    const destinationCity = await this.cityService.findOne(destinationCityId);

    if(owner && departureCity && destinationCity) {
      // create a new carpool
      const createdCarpool = await this.carpoolRepository.create(carpool);
      
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
}

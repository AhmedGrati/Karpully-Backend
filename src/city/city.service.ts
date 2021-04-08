import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CITY_NOT_FOUND_ERROR_MESSAGE, GOV_NOT_FOUND_ERROR_MESSAGE } from '../utils/constants';
import { Repository } from 'typeorm';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';
import { City } from './entities/city.entity';
import { GovService } from '../gov/gov.service';
import { Gov } from '../gov/entities/gov.entity';

@Injectable()
export class CityService {
  constructor(@InjectRepository(City) private readonly cityRepository: Repository<City>,
    private readonly govService: GovService
  ){}
  async create(createCityInput: CreateCityInput): Promise<City> {
    return this.checkGovAndSave(createCityInput);
  }

  async findAll(): Promise<City[]> {
    return await this.cityRepository.find({relations:["gov"]});
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({where:{id}, relations:["gov"]});
    if(city) {
      return city;
    }
    throw new NotFoundException(CITY_NOT_FOUND_ERROR_MESSAGE);
  }

  async update(id: number, updateCityInput: UpdateCityInput):Promise<City> {
    let city = await this.findOne(id);
    if(!city) {
      throw new NotFoundException(CITY_NOT_FOUND_ERROR_MESSAGE);
    }else{
      return this.checkGovAndSave(updateCityInput);
    }
  }

  async remove(id: number): Promise<City> {
    const cityToRemove = await this.findOne(id);
    await this.cityRepository.delete(id);
    return cityToRemove;
  }

  // this function checks if the gov of the city exists or not
  // if it does we will save the city normally
  // else we will throw an exception
  async checkGovAndSave(city: CreateCityInput | UpdateCityInput): Promise<City> {
    const gov = await this.govService.findOne(city.govId);
      if(gov) {
        const newCity  = await this.cityRepository.create(city);
        newCity.gov = gov;
        await this.cityRepository.save(newCity);
        return newCity;
      } else {
        throw new NotFoundException(GOV_NOT_FOUND_ERROR_MESSAGE);
      }
  }

  async findCitiesByGov(govId: number): Promise<City[]> {
    const cities = await this.cityRepository.createQueryBuilder('city')
        .where("city.gov.id = :govId",{govId})
        .getMany();
    return cities;
  }
}

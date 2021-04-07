import { Injectable } from '@nestjs/common';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';

@Injectable()
export class CityService {
  create(createCityInput: CreateCityInput) {
    return 'This action adds a new city';
  }

  findAll() {
    return `This action returns all city`;
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityInput: UpdateCityInput) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}

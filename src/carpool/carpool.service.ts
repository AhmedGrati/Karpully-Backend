import { Injectable } from '@nestjs/common';
import { CreateCarpoolInput } from './dto/create-carpool.input';
import { UpdateCarpoolInput } from './dto/update-carpool.input';

@Injectable()
export class CarpoolService {
  create(createCarpoolInput: CreateCarpoolInput) {
    return 'This action adds a new carpool';
  }

  findAll() {
    return `This action returns all carpool`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carpool`;
  }

  update(id: number, updateCarpoolInput: UpdateCarpoolInput) {
    return `This action updates a #${id} carpool`;
  }

  remove(id: number) {
    return `This action removes a #${id} carpool`;
  }
}

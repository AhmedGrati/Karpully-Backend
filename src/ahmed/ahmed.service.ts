import { Injectable } from '@nestjs/common';
import { CreateAhmedInput } from './dto/create-ahmed.input';
import { UpdateAhmedInput } from './dto/update-ahmed.input';

@Injectable()
export class AhmedService {
  create(createAhmedInput: CreateAhmedInput) {
    return 'This action adds a new ahmed';
  }

  findAll() {
    return `This action returns all ahmed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ahmed`;
  }

  update(id: number, updateAhmedInput: UpdateAhmedInput) {
    return `This action updates a #${id} ahmed`;
  }

  remove(id: number) {
    return `This action removes a #${id} ahmed`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateGovInput } from './dto/create-gov.input';
import { UpdateGovInput } from './dto/update-gov.input';

@Injectable()
export class GovService {
  create(createGovInput: CreateGovInput) {
    return 'This action adds a new gov';
  }

  findAll() {
    return `This action returns all gov`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gov`;
  }

  update(id: number, updateGovInput: UpdateGovInput) {
    return `This action updates a #${id} gov`;
  }

  remove(id: number) {
    return `This action removes a #${id} gov`;
  }
}

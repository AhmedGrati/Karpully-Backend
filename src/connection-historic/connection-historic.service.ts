import { Injectable } from '@nestjs/common';
import { CreateConnectionHistoricInput } from './dto/create-connection-historic.input';
import { UpdateConnectionHistoricInput } from './dto/update-connection-historic.input';

@Injectable()
export class ConnectionHistoricService {
  create(createConnectionHistoricInput: CreateConnectionHistoricInput) {
    return 'This action adds a new connectionHistoric';
  }

  findAll() {
    return `This action returns all connectionHistoric`;
  }

  findOne(id: number) {
    return `This action returns a #${id} connectionHistoric`;
  }

  update(id: number, updateConnectionHistoricInput: UpdateConnectionHistoricInput) {
    return `This action updates a #${id} connectionHistoric`;
  }

  remove(id: number) {
    return `This action removes a #${id} connectionHistoric`;
  }
}

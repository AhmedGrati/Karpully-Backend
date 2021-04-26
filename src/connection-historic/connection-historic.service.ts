import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {Repository} from 'typeorm';
import {ConnectionHistoric} from './entities/connection-historic.entity';

@Injectable()
export class ConnectionHistoricService {
  constructor(
    @InjectRepository(ConnectionHistoric)
    private readonly connectionHistoricRepository: Repository<ConnectionHistoric>,
  ) {}
  async create(owner: User): Promise<ConnectionHistoric> {
    const createdHistoric = await this.connectionHistoricRepository.create({
      owner,
    });
    return await this.connectionHistoricRepository.save(createdHistoric);
  }

  async findOneByUserId(userId: number): Promise<ConnectionHistoric> {
    return await this.connectionHistoricRepository.findOne({
      where: {owner: userId},
    });
  }

  async findOne(id: number): Promise<ConnectionHistoric> {
    return await this.connectionHistoricRepository.findOne({where: {id}});
  }

  async updateConnectionHistoric(historic: ConnectionHistoric) {
    const {id, connections, ...data} = historic;

    await this.connectionHistoricRepository
      .update(id, data)
      .then((updatedHistoric) => updatedHistoric.raw[0]);
    return await this.findOne(id);
  }
}

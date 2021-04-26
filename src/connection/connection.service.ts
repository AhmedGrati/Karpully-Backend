import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ConnectionHistoric} from '../connection-historic/entities/connection-historic.entity';
import {Repository} from 'typeorm';
import {Connection} from './entities/connection.entity';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}
  async create(historic: ConnectionHistoric): Promise<Connection> {
    const connection = await this.connectionRepository.create();
    connection.historic = historic;
    return await this.connectionRepository.save(connection);
  }
}

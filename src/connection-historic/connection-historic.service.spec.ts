import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ConnectionHistoricService} from './connection-historic.service';
import {ConnectionHistoric} from './entities/connection-historic.entity';

describe('ConnectionHistoricService', () => {
  let service: ConnectionHistoricService;
  const mockConnectionHistoricRepository = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectionHistoricService,
        {
          provide: getRepositoryToken(ConnectionHistoric),
          useValue: mockConnectionHistoricRepository,
        },
      ],
    }).compile();

    service = module.get<ConnectionHistoricService>(ConnectionHistoricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ConnectionHistoric} from 'src/connection-historic/entities/connection-historic.entity';
import {ConnectionService} from './connection.service';
import {Connection} from './entities/connection.entity';

describe('ConnectionService', () => {
  let service: ConnectionService;
  const historic = {id: 1, owner: {id: 1, email: 'ahmedgrati@gmail.com'}};
  const mockConnectionRepository = {
    create: jest.fn().mockReturnValue({id: 1, historic}),
    save: jest.fn().mockResolvedValue({id: 1, historic}),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectionService,
        {
          provide: getRepositoryToken(Connection),
          useValue: mockConnectionRepository,
        },
      ],
    }).compile();

    service = module.get<ConnectionService>(ConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a connection entity', async () => {
    expect(await service.create).toBeDefined();
    expect(await service.create(historic as ConnectionHistoric)).toMatchObject({
      id: 1,
    });

    expect(
      await (await service.create(historic as ConnectionHistoric)).historic
        .owner,
    ).toMatchObject({
      email: 'ahmedgrati@gmail.com',
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionHistoricService } from './connection-historic.service';

describe('ConnectionHistoricService', () => {
  let service: ConnectionHistoricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionHistoricService],
    }).compile();

    service = module.get<ConnectionHistoricService>(ConnectionHistoricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

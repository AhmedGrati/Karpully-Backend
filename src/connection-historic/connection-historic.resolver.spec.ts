import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionHistoricResolver } from './connection-historic.resolver';
import { ConnectionHistoricService } from './connection-historic.service';

describe('ConnectionHistoricResolver', () => {
  let resolver: ConnectionHistoricResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionHistoricResolver, ConnectionHistoricService],
    }).compile();

    resolver = module.get<ConnectionHistoricResolver>(ConnectionHistoricResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

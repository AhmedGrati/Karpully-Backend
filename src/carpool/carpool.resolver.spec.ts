import {Test, TestingModule} from '@nestjs/testing';
import {CarpoolResolver} from './carpool.resolver';
import {CarpoolService} from './carpool.service';

describe('CarpoolResolver', () => {
  let resolver: CarpoolResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarpoolResolver, CarpoolService],
    }).compile();

    resolver = module.get<CarpoolResolver>(CarpoolResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

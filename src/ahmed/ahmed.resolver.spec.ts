import { Test, TestingModule } from '@nestjs/testing';
import { AhmedResolver } from './ahmed.resolver';
import { AhmedService } from './ahmed.service';

describe('AhmedResolver', () => {
  let resolver: AhmedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AhmedResolver, AhmedService],
    }).compile();

    resolver = module.get<AhmedResolver>(AhmedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

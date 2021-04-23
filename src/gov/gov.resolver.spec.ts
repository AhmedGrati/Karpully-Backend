import {Test, TestingModule} from '@nestjs/testing';
import {GovResolver} from './gov.resolver';
import {GovService} from './gov.service';

describe('GovResolver', () => {
  let resolver: GovResolver;
  const mockGovService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GovResolver, GovService],
    })
      .overrideProvider(GovService)
      .useValue(mockGovService)
      .compile();

    resolver = module.get<GovResolver>(GovResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

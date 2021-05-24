import {Test, TestingModule} from '@nestjs/testing';
import {DirectionResolver} from './direction.resolver';
import {DirectionService} from './direction.service';

describe('DirectionResolver', () => {
  let resolver: DirectionResolver;
  const mockDirectionService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectionResolver, DirectionService],
    })
      .overrideProvider(DirectionService)
      .useValue(mockDirectionService)
      .compile();

    resolver = module.get<DirectionResolver>(DirectionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

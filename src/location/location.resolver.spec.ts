import { Test, TestingModule } from '@nestjs/testing';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';

describe('LocationResolver', () => {
  let resolver: LocationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationResolver, LocationService],
    }).compile();

    resolver = module.get<LocationResolver>(LocationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import {Test, TestingModule} from '@nestjs/testing';
import {LocationResolver} from './location.resolver';
import {LocationService} from './location.service';

describe('LocationResolver', () => {
  let resolver: LocationResolver;
  const mockLocationService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationResolver, LocationService],
    })
      .overrideProvider(LocationService)
      .useValue(mockLocationService)
      .compile();

    resolver = module.get<LocationResolver>(LocationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

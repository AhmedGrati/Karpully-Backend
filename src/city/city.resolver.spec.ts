import {Test, TestingModule} from '@nestjs/testing';
import {CityResolver} from './city.resolver';
import {CityService} from './city.service';
import {City} from './entities/city.entity';

/*
  The most used one is findOneCity so we will only test it
*/
describe('CityResolver', () => {
  let resolver: CityResolver;
  const city = new City();
  const mockCityService = {
    findOne: jest.fn().mockReturnValue(city),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityResolver, CityService],
    })
      .overrideProvider(CityService)
      .useValue(mockCityService)
      .compile();

    resolver = module.get<CityResolver>(CityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find a city with the specific id', () => {
    expect(resolver.findOneCity(1)).toBeDefined();
    expect(resolver.findOneCity(1)).toMatchObject(city);
    expect(mockCityService.findOne).toBeCalledWith(1);
  });
});

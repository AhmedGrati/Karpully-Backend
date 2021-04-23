import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {GovService} from '../gov/gov.service';
import {CityService} from './city.service';
import {City} from './entities/city.entity';

describe('CityService', () => {
  let service: CityService;
  const city = new City();
  const mockCityRepository = {
    findOne: jest.fn().mockResolvedValue(city),
  };
  const mockGovService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(City),
          useValue: mockCityRepository,
        },
        GovService,
      ],
    })
      .overrideProvider(GovService)
      .useValue(mockGovService)
      .compile();

    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a city with the specific id', async () => {
    expect(await service.findOne(1)).toBeDefined();
    expect(await service.findOne(1)).toMatchObject(city);
    expect(mockCityRepository.findOne).toBeCalled();
  });
});

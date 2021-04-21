import {Test, TestingModule} from '@nestjs/testing';
import {FakerCityService} from './faker-city.service';

describe('FakerCityService', () => {
  let service: FakerCityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakerCityService],
    }).compile();

    service = module.get<FakerCityService>(FakerCityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

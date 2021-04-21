import {Test, TestingModule} from '@nestjs/testing';
import {FakerCarpoolService} from './faker-carpool.service';

describe('FakerCarpoolService', () => {
  let service: FakerCarpoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakerCarpoolService],
    }).compile();

    service = module.get<FakerCarpoolService>(FakerCarpoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

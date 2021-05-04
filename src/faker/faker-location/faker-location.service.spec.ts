import { Test, TestingModule } from '@nestjs/testing';
import { FakerLocationService } from './faker-location.service';

describe('FakerLocationService', () => {
  let service: FakerLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakerLocationService],
    }).compile();

    service = module.get<FakerLocationService>(FakerLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

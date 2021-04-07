import { Test, TestingModule } from '@nestjs/testing';
import { CarpoolService } from './carpool.service';

describe('CarpoolService', () => {
  let service: CarpoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarpoolService],
    }).compile();

    service = module.get<CarpoolService>(CarpoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

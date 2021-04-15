import { Test, TestingModule } from '@nestjs/testing';
import { FakerService } from './faker.service';

describe('FakerService', () => {
  let service: FakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakerService],
    }).compile();

    service = module.get<FakerService>(FakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

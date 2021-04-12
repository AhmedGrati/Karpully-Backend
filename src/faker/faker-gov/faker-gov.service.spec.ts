import { Test, TestingModule } from '@nestjs/testing';
import { FakerGovService } from './faker-gov.service';

describe('FakerGovService', () => {
  let service: FakerGovService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakerGovService],
    }).compile();

    service = module.get<FakerGovService>(FakerGovService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

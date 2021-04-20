import { Test, TestingModule } from '@nestjs/testing';
import { AhmedService } from './ahmed.service';

describe('AhmedService', () => {
  let service: AhmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AhmedService],
    }).compile();

    service = module.get<AhmedService>(AhmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

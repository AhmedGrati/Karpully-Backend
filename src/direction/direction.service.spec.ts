import { Test, TestingModule } from '@nestjs/testing';
import { DirectionService } from './direction.service';

describe('DirectionService', () => {
  let service: DirectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectionService],
    }).compile();

    service = module.get<DirectionService>(DirectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

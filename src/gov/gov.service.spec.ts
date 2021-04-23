import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Gov} from './entities/gov.entity';
import {GovService} from './gov.service';

describe('GovService', () => {
  let service: GovService;
  const mockGovRepository = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GovService,
        {
          provide: getRepositoryToken(Gov),
          useValue: mockGovRepository,
        },
      ],
    }).compile();

    service = module.get<GovService>(GovService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

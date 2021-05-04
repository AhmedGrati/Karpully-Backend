import { Test, TestingModule } from '@nestjs/testing';
import { FakerAddressService } from './faker-address.service';

describe('FakerAddressService', () => {
  let service: FakerAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakerAddressService],
    }).compile();

    service = module.get<FakerAddressService>(FakerAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

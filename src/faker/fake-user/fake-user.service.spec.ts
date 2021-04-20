import {Test, TestingModule} from '@nestjs/testing';
import {FakeUserService} from './fake-user.service';

describe('FakeUserService', () => {
  let service: FakeUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeUserService],
    }).compile();

    service = module.get<FakeUserService>(FakeUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

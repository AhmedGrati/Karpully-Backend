import {HttpService} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {DirectionService} from './direction.service';

describe('DirectionService', () => {
  let service: DirectionService;
  const mockHttpService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectionService, HttpService],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    service = module.get<DirectionService>(DirectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {CaslAbilityFactory, Subjects} from '../casl/casl-ability.factory';
import {CityService} from '../city/city.service';
import {CarpoolService} from './carpool.service';
import {Carpool} from './entities/carpool.entity';
import {Ability} from '@casl/ability';

describe('CarpoolService', () => {
  let service: CarpoolService;
  const mockCarpoolRepository = {
    restore: jest.fn().mockImplementation((user, id) => {
      return Promise.resolve({id});
    }),
    findOne: jest.fn().mockImplementation((id) => {
      return Promise.resolve({id});
    }),
  };
  const mockCityService = {};
  const mockCaslFactory = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarpoolService,
        {
          provide: getRepositoryToken(Carpool),
          useValue: mockCarpoolRepository,
        },
        CityService,
        CaslAbilityFactory,
      ],
    })
      .overrideProvider(CityService)
      .useValue(mockCityService)
      .overrideProvider(CaslAbilityFactory)
      .useValue(mockCaslFactory)
      .compile();

    service = module.get<CarpoolService>(CarpoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the paginated carpools', async () => {
    expect(await service.paginatedCarpools).toBeDefined();
  });
});

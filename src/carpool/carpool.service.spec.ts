import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {CaslAbilityFactory, Subjects} from '../casl/casl-ability.factory';
import {CityService} from '../city/city.service';
import {CarpoolService} from './carpool.service';
import {Carpool} from './entities/carpool.entity';
import {Ability} from '@casl/ability';
import {PaginatedCarpool} from './entities/paginatedCarpool.entity';
import {CreateCarpoolInput} from './dto/create-carpool.input';
import {City} from '../city/entities/city.entity';
import {PaginationInput} from '../generics/pagination.input';
import {Where} from './dto/where.input';
import {Logger, UnauthorizedException} from '@nestjs/common';
import {CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE} from '../utils/constants';
import {LocationService} from '../location/location.service';
import {Location} from '../location/entities/location.entity';
describe('CarpoolService', () => {
  let service: CarpoolService;
  const carpool = new Carpool();
  const paginatedCarpools: PaginatedCarpool = {
    meta: {
      currentPage: 1,
      itemCount: 0,
    },
    items: [],
  };
  const city = new City();
  const user = new User();
  const ability = new Ability();
  const createCarpoolInput: CreateCarpoolInput = {} as CreateCarpoolInput;
  const paginationInput: PaginationInput = {
    page: 1,
    limit: 20,
  };
  const where: Where = {
    id: 1,
  };
  const mockLocationService = {
    reverseSearchLocation: jest.fn().mockResolvedValue(new Location()),
  };

  const mockCarpoolRepository = {
    restore: jest.fn().mockResolvedValue(carpool),
    findOne: jest.fn().mockResolvedValue(carpool),
    create: jest.fn().mockReturnValue(carpool),
    save: jest.fn().mockResolvedValue(carpool),
    update: jest.fn().mockResolvedValue(carpool),
    merge: jest.fn().mockResolvedValue(carpool),
    find: jest.fn().mockResolvedValue([]),
  };
  const mockCityService = {
    findOne: jest.fn().mockResolvedValue(city),
  };
  const mockCaslFactory = {
    createForUser: jest.fn().mockReturnValue(ability),
  };
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
        LocationService,
      ],
    })
      .overrideProvider(CityService)
      .useValue(mockCityService)
      .overrideProvider(LocationService)
      .useValue(mockLocationService)
      .overrideProvider(CaslAbilityFactory)
      .useValue(mockCaslFactory)
      .compile();

    service = module.get<CarpoolService>(CarpoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the paginated carpools', async () => {
    expect(await service.paginatedCarpools(paginationInput, where)).toEqual(
      paginatedCarpools,
    );
  });

  it('should create a carpool', async () => {
    expect(await service.create(new User(), createCarpoolInput)).toEqual(
      carpool,
    );
    expect(mockCarpoolRepository.create).toBeCalled();
    expect(mockCarpoolRepository.save).toBeCalled();
  });

  it('should find a carpool with the specific id', async () => {
    expect(await service.findOne(1)).toBeDefined();
    expect(mockCarpoolRepository.findOne).toBeCalled();
  });

  it('should restore, remove, update a carpool with the specific id', async () => {
    expect(service.restoreCarpool(user, 1)).rejects.toThrowError(
      UnauthorizedException,
    );
    expect(service.restoreCarpool(user, 1)).rejects.toThrowError(
      CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE,
    );
  });
});

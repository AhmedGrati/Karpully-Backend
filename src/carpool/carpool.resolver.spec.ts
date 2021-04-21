import {Test, TestingModule} from '@nestjs/testing';
import {User} from '../user/entities/user.entity';
import {PaginationInput} from '../generics/pagination.input';
import {CarpoolResolver} from './carpool.resolver';
import {CarpoolService} from './carpool.service';
import {Where} from './dto/where.input';
import {Carpool} from './entities/carpool.entity';
import {PaginatedCarpool} from './entities/paginatedCarpool.entity';
import {CreateCarpoolInput} from './dto/create-carpool.input';

describe('CarpoolResolver', () => {
  let resolver: CarpoolResolver;
  const carpoolMockService = {
    paginatedCarpools: jest.fn().mockImplementation(
      (paginationInput, where?): PaginatedCarpool => {
        return {meta: {itemCount: 0, currentPage: 1}, items: []};
      },
    ),
    restoreCarpool: jest.fn().mockImplementation((user, id) => new Carpool()),
    remove: jest.fn().mockImplementation((user, id) => new Carpool()),
    findOne: jest.fn().mockImplementation((id) => {
      return {id};
    }),
    create: jest.fn().mockImplementation((dto) => {
      return {
        ...dto,
        id: 1,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarpoolResolver, CarpoolService],
    })
      .overrideProvider(CarpoolService)
      .useValue(carpoolMockService)
      .compile();

    resolver = module.get<CarpoolResolver>(CarpoolResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return a pagination of carpools', () => {
    const where: Where = {
      id: 1,
    };
    const paginationInput: PaginationInput = {
      limit: 20,
      page: 2,
    };
    expect(resolver.paginatedCarpool(paginationInput, where)).toBeDefined();
    expect(carpoolMockService.paginatedCarpools).toBeCalledWith(
      paginationInput,
      where,
    );
  });
  it('should restore a carpool with the specific id', () => {
    const id: number = 1;
    const user: User = new User();
    expect(resolver.restoreCarpool(user, id)).toBeDefined();
    expect(carpoolMockService.restoreCarpool).toBeCalledWith(user, id);
  });

  it('should remove a carpool with the specific id', () => {
    const id: number = 1;
    const user: User = new User();
    expect(resolver.removeCarpool(user, id)).toBeDefined();
    expect(carpoolMockService.remove).toBeCalledWith(user, id);
  });

  it('should find a carpool with the specific id', () => {
    const id: number = 1;
    expect(resolver.findOneCarpool(id)).toMatchObject({id});
    expect(carpoolMockService.findOne).toBeCalledWith(id);
  });
  it('should find a carpool with the specific id', () => {
    const createCarpoolInput: CreateCarpoolInput = {} as CreateCarpoolInput;
    const user = new User();
    expect(resolver.createCarpool(user, createCarpoolInput)).toMatchObject({
      id: 1,
    });
    expect(carpoolMockService.create).toBeCalled();
  });
});

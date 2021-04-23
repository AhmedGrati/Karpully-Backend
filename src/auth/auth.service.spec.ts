import {JwtService} from '@nestjs/jwt';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {AuthService} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserRepository = {
    findOne: jest.fn().mockImplementation(async () => {
      const user = new User();
      user.password = '123456';
      return Promise.resolve(user);
    }),
  };
  const mockJwtService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        JwtService,
      ],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should validate a user', async () => {
    const username = 'ahmed grati';
    const password = '123456';
    const validUser = new User();
    expect(await service.validateUser(username, password)).toMatchObject(
      validUser,
    );
    expect(mockUserRepository.findOne).toBeCalled();
  });
});

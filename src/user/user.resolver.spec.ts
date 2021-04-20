import {Test, TestingModule} from '@nestjs/testing';
import {EmailTypeEnum} from 'src/email/entities/email-type.enum';
import {Email} from 'src/email/entities/email.entity';
import {AuthService} from '../auth/auth.service';
import {CreateUserInput} from './dto/create-user.input';
import {Gender} from './entities/gender';
import {User} from './entities/user.entity';
import {UserResolver} from './user.resolver';
import {UserService} from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  const userMockService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    findAll: jest.fn(() => []),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    })
      .overrideProvider(UserService)
      .useValue(userMockService)
      .compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return a user after creating it', () => {
    const dto: CreateUserInput = {
      firstname: 'ahmed',
      lastname: 'grati',
      age: 25,
      email: 'ahmedgrati1999@gmail.com',
      username: 'ahmed grati',
      roles: ['admin'],
      password: 'ahmed',
      localization: 'Tunis',
      telNumber: '+216 25042021',
      rate: 5,
      gender: Gender.MALE,
      id: 1,
    };
    expect(resolver.createUser(dto)).toMatchObject(dto);
    expect(userMockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return list of all users', () => {
    const allUsers: User[] = [];
    expect(resolver.findAll()).toEqual(allUsers);
    expect(userMockService.findAll).toHaveBeenCalledWith();
  });
});

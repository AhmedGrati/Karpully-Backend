import {BadRequestException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {EmailVerificationInput} from 'src/email/dto/email-verification.input';
import {ResetPasswordEmailInput} from 'src/email/dto/reset-password-email.input';
import {EmailModule} from '../email/email.module';
import {EmailService} from '../email/email.service';
import {CreateUserInput} from './dto/create-user.input';
import {ResetPasswordInput} from './dto/reset-password.input';
import {User} from './entities/user.entity';
import {UserService} from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = {
    create: jest.fn().mockImplementation(async (dto) => {
      return Promise.resolve({
        id: 1,
        ...dto,
      });
    }),
    findOne: jest.fn().mockImplementation(async ({username, email}) => {
      const user = new User();
      user.salt = '$2b$10$FVO2GB0ICX8SvZ9mgRCocu';
      return Promise.resolve(user);
    }),
    save: jest.fn().mockImplementation(async (dto) => {
      return Promise.resolve({
        id: 1,
        ...dto,
      });
    }),
  };
  const mockEmailService = {
    sendEmail: jest.fn().mockImplementation(async (user, emailType) => {
      return Promise.resolve(true);
    }),
    confirmEmail: jest
      .fn()
      .mockImplementation(async (emailVerificationInput) => {
        return Promise.resolve(true);
      }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        EmailService,
      ],
    })
      .overrideProvider(EmailService)
      .useValue(mockEmailService)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create a user', async () => {
  //   const createUserInput: CreateUserInput = {
  //     username: 'ahmed',
  //     email: 'ahmedgrati1999@gmail.com',
  //   } as CreateUserInput;
  //   expect(await service.create(createUserInput)).toBeDefined();
  //   expect(mockUserRepository.findOne).toBeCalled();
  //   expect(mockUserRepository.create).toBeCalledWith(createUserInput);
  //   expect(mockEmailService.sendEmail).toBeCalled();
  // });

  it('should valid the user confirmation', async () => {
    const emailVerificationInput: EmailVerificationInput = {
      userId: 1,
      token: 'token',
      verificationToken: 'verificationToken',
    };
    expect(
      await service.validUserConfirmation(emailVerificationInput),
    ).toBeDefined();
    expect(mockUserRepository.findOne).toBeCalled();
    expect(mockUserRepository.save).toBeCalled();
    expect(mockEmailService.confirmEmail).toBeCalled();
  });

  it('should send the reset password email for the user', async () => {
    const resetPasswordEmailInput: ResetPasswordEmailInput = {
      email: 'ahmedgrati@gmail.com',
    };
    expect(
      await service.sendResetPasswordEmail(resetPasswordEmailInput),
    ).toBeDefined();
    expect(mockUserRepository.findOne).toBeCalled();
    expect(mockEmailService.sendEmail).toBeCalled();
  });

  it('should reset the password of the user', async () => {
    const resetPasswordInput: ResetPasswordInput = {
      email: 'ahmedgrati1999@gmail.com',
      password: 'pass',
      token: 'token',
      verificationToken: 'verificationToken',
    };
    expect(await service.resetPassword(resetPasswordInput)).toBeDefined();
    expect(mockUserRepository.findOne).toBeCalled();
    expect(mockEmailService.confirmEmail).toBeCalled();
  });
});

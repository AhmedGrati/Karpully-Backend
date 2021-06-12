import { Test, TestingModule } from '@nestjs/testing';
import { EmailVerificationInput } from 'src/email/dto/email-verification.input';
import { ResetPasswordEmailInput } from 'src/email/dto/reset-password-email.input';
import { EmailTypeEnum } from 'src/email/entities/email-type.enum';
import { Email } from 'src/email/entities/email.entity';
import { AuthService } from '../auth/auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { FirstStageDTOInput } from './dto/first-stage-dto.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { SecondStageDTOInput } from './dto/second-stage-dto.input';
import { Gender } from './entities/gender';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  const firstStageUser = new User();
  firstStageUser.username = 'ahmed';
  firstStageUser.password = 'pass123';
  firstStageUser.email = 'ahmed@gmail.com';

  const secondStageUser = new User();
  secondStageUser.isConfirmed = true;
  secondStageUser.completedSignUp = true;

  const userMockService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    findAll: jest.fn(() => []),
    findOne: jest.fn((user, id) => {
      return {
        ...user,
        email: 'ahmedgrati1999@gmail.com',
        id,
      };
    }),
    validUserConfirmation: jest.fn((emailConfirmationInput) => true),
    sendResetPasswordEmail: jest.fn((resetPasswordEmailInput) => true),
    resetPassword: jest.fn((resetPasswordInput) => true),
    firstStageSignUp: jest.fn().mockReturnValue(firstStageUser),
    secondStageSignUp: jest.fn().mockReturnValue(secondStageUser),
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

  it('should perform the first stage of the sign up', async () => {
    const firstStageInputDTO: FirstStageDTOInput = {
      email: 'ahmed@gmail.com',
      username: 'ahmed',
      password: 'pass123',
    };
    expect(resolver.firstStageSignUp).toBeDefined();
    expect(resolver.firstStageSignUp(firstStageInputDTO)).toMatchObject(
      firstStageUser,
    );
    expect(
      await (await resolver.firstStageSignUp(firstStageUser)).isConfirmed,
    ).toBeFalsy();
    expect(
      await (await resolver.firstStageSignUp(firstStageUser)).completedSignUp,
    ).toBeFalsy();
    expect(userMockService.firstStageSignUp).toBeCalledWith(firstStageInputDTO);
  });

  it('should perform the second stage of the sign up', async () => {
    const secondStageDTOInput: SecondStageDTOInput = {
      firstname: 'ahmed',
      lastname: 'grati',
      age: 20,
      id: 1,
      localization: 'Tunis',
      telNumber: '+216 25042021',
      gender: Gender.MALE,
    };
    expect(resolver.secondStageSignUp).toBeDefined();
    expect(resolver.secondStageSignUp(secondStageDTOInput)).toMatchObject(
      secondStageUser,
    );
    expect(
      await (await resolver.secondStageSignUp(firstStageUser)).isConfirmed,
    ).toBeTruthy();
    expect(
      await (await resolver.secondStageSignUp(firstStageUser)).completedSignUp,
    ).toBeTruthy();
    expect(userMockService.secondStageSignUp).toBeCalledWith(
      secondStageDTOInput,
    );
  });

  // it('should return a user after creating it', () => {
  //   const dto: CreateUserInput = {
  //     firstname: 'ahmed',
  //     lastname: 'grati',
  //     age: 25,
  //     email: 'ahmedgrati1999@gmail.com',
  //     username: 'ahmed grati',
  //     roles: ['admin'],
  //     password: 'ahmed',
  //     localization: 'Tunis',
  //     telNumber: '+216 25042021',
  //     rate: 5,
  //     gender: Gender.MALE,
  //     id: 1,
  //   };
  //   expect(resolver.createUser(dto)).toMatchObject(dto);
  //   expect(userMockService.create).toHaveBeenCalledWith(dto);
  // });

  it('should return list of all users', () => {
    const allUsers: User[] = [];
    expect(resolver.findAll()).toEqual(allUsers);
    expect(userMockService.findAll).toHaveBeenCalledWith();
  });

  it('should return a user that match with the specific id', () => {
    const id: number = 1;
    const user = { email: 'ahmedgrati1999@gmail.com', id };
    expect(resolver.findOne(user as User, id)).toMatchObject(user);
    expect(userMockService.findOne).toHaveBeenCalledTimes(1);
    expect(userMockService.findOne).toHaveBeenCalledWith(user as User, id);
  });

  it('should confirm a user account using the sent email', () => {
    const emailVerificationInput: EmailVerificationInput = {
      token: 'token',
      verificationToken: 'verificationToken',
      userId: 1,
    };
    expect(resolver.confirmEmail(emailVerificationInput)).toEqual(true);
    expect(userMockService.validUserConfirmation).toHaveBeenCalledWith(
      emailVerificationInput,
    );
  });

  it('should send a reset password email', () => {
    const resetPasswordEmailInput: ResetPasswordEmailInput = {
      email: 'ahmedgrati1999@gmail.com',
    };
    expect(resolver.sendResetPasswordEmail(resetPasswordEmailInput)).toEqual(
      true,
    );
    expect(userMockService.sendResetPasswordEmail).toHaveBeenCalledWith(
      resetPasswordEmailInput,
    );
  });

  it('should reset the password of a given user', () => {
    const resetPasswordInput: ResetPasswordInput = {
      email: 'ahmedgrati1999@gmail.com',
      password: 'pass123',
      token: 'token',
      verificationToken: 'verifToken',
    };
    expect(resolver.resetPassword(resetPasswordInput)).toEqual(true);
    expect(userMockService.resetPassword).toHaveBeenCalledWith(
      resetPasswordInput,
    );
  });
});

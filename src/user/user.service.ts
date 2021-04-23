import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {User} from './entities/user.entity';
import {UserRoleEnum} from './entities/user-role.enum';
import {EmailService} from '../email/email.service';
import {EmailTypeEnum} from '../email/entities/email-type.enum';
import {EmailVerificationInput} from '../email/dto/email-verification.input';
import {
  SENDING_EMAIL_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
} from '../utils/constants';
import {ResetPasswordEmailInput} from 'src/email/dto/reset-password-email.input';
import {ResetPasswordInput} from './dto/reset-password.input';
import * as bcrypt from 'bcrypt';
import {FirstStageDTOInput} from './dto/first-stage-dto.input';
import {SecondStageDTOInput} from './dto/second-stage-dto.input';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

    private readonly emailService: EmailService,
  ) {}

  // THIS FUNCTION IS NOT USED IN RESOLVERS INSTEAD IT IS USED IN TESTS TO CREATE AND POPULATE DATA
  async create(createUserInput: CreateUserInput): Promise<User> {
    // check if the user is unique or not
    let checkUser = await this.userRepository.findOne({
      where: [
        {
          lowerCasedUsername: createUserInput.username.toLowerCase(),
        },
        {email: createUserInput.email},
      ],
    });
    if (!checkUser) {
      const user = await this.userRepository.create(createUserInput);
      user.lowerCasedUsername = user.username.toLowerCase();
      await this.userRepository.save(user);
      // send a confirmation to the user
      const isEmailSent: Boolean = await this.emailService.sendEmail(
        user,
        EmailTypeEnum.CONFIRMATION,
      );
      if (isEmailSent) {
        return user;
      } else {
        throw new InternalServerErrorException(SENDING_EMAIL_ERROR_MESSAGE);
      }
    } else {
      // if the user has the same username or email with someone else we throw an exception
      throw new HttpException(
        'The User Already Exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async firstStageSignUp(firstStageDTO: FirstStageDTOInput) {
    // check if the user is unique or not
    let checkUser = await this.userRepository.findOne({
      where: [
        {
          lowerCasedUsername: firstStageDTO.username.toLowerCase(),
        },
        {email: firstStageDTO.email},
      ],
    });
    if (!checkUser) {
      const user = await this.userRepository.create(firstStageDTO);
      user.lowerCasedUsername = user.username.toLowerCase();
      user.completedSignUp = false;
      await this.userRepository.save(user);
      // send a confirmation to the user
      const isEmailSent: Boolean = await this.emailService.sendEmail(
        user,
        EmailTypeEnum.CONFIRMATION,
      );
      if (isEmailSent) {
        return user;
      } else {
        throw new InternalServerErrorException(SENDING_EMAIL_ERROR_MESSAGE);
      }
    } else {
      // if the user has the same username or email with someone else we throw an exception
      throw new HttpException(
        'The User Already Exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async secondStageSignUp(secondStageDTO: SecondStageDTOInput): Promise<User> {
    const {
      firstname,
      lastname,
      age,
      localization,
      telNumber,
      gender,
      id,
    } = secondStageDTO;
    const user = await this.internalFindOne(id);
    if (user && user.isConfirmed) {
      user.completedSignUp = true;
      user.firstname = firstname;
      user.lastname = lastname;
      user.age = age;
      user.localization = localization;
      user.telNumber = telNumber;
      user.gender = gender;

      return await this.userRepository.save(user);
    } else {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(user: User, id: number): Promise<User> {
    if (this.checkAuthorities(user, id)) {
      return await this.userRepository.findOne({where: {id}});
    } else {
      throw new UnauthorizedException();
    }
  }

  // this function is for internal use
  async internalFindOne(id: number): Promise<User> {
    return await this.userRepository.findOne({where: {id}});
  }

  async update(
    currentUser: User,
    userId: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    // this will throw an error if the current user does not have the right to update.
    let user = await this.findOne(currentUser, userId);

    // we check if the user is not found in the database we couldn't update so we throw an exception
    if (!user) {
      throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    } else {
      const {id, ...data} = updateUserInput;
      await this.userRepository
        .update(userId, data)
        .then((updatedUser) => updatedUser.raw[0]);
      return await this.findOne(currentUser, userId);
    }
  }

  async remove(user, id: number): Promise<User> {
    const userToRemove = await this.findOne(user, id);
    await this.userRepository.delete(id);
    return userToRemove;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({where: {username}});
  }

  // a method which check the authority of a user
  checkAuthorities(user: User, id: number): boolean {
    // If the user is admin he has all authorities
    if (user.roles.indexOf(UserRoleEnum.ADMIN) > -1) {
      return true;
    } else {
      // else we check if the user who demand to find userById correspond to the actual user in database or not.
      return user.id === id;
    }
  }

  /*
    if email confirmation is true it means that the user confirm the registration in a maximum of two days
    so we should update the user and make his confirmation attribute to true
    else we should delete him from database so he could make another registration with the same data (email, username etc..)
  */
  async validUserConfirmation(
    emailVerificationInput: EmailVerificationInput,
  ): Promise<Boolean> {
    const {userId, token, verificationToken} = emailVerificationInput;
    const user: User = await this.userRepository.findOne({where: {id: userId}});
    if (user) {
      const emailConfirmation = await this.emailService.confirmEmail(
        user,
        token,
        verificationToken,
        EmailTypeEnum.CONFIRMATION,
      );
      if (emailConfirmation) {
        user.isConfirmed = true;
        await this.userRepository.save(user);
      } else {
        // if the user account is not confirmed we should delete his account so he can try another registration
        if (user.isConfirmed === false) {
          await this.userRepository.delete(userId);
        }
      }
      return emailConfirmation;
    } else {
      throw new NotFoundException(USER_NOT_FOUND_ERROR_MESSAGE);
    }
  }

  async sendResetPasswordEmail(
    resetPasswordEmail: ResetPasswordEmailInput,
  ): Promise<Boolean> {
    const {email} = resetPasswordEmail;
    const user: User = await this.userRepository.findOne({where: {email}});
    if (user) {
      const isEmailSent: Boolean = await this.emailService.sendEmail(
        user,
        EmailTypeEnum.RESET_PASSWORD,
      );
      if (isEmailSent) {
        return isEmailSent;
      } else {
        throw new InternalServerErrorException(SENDING_EMAIL_ERROR_MESSAGE);
      }
    } else {
      throw new NotFoundException(USER_NOT_FOUND_ERROR_MESSAGE);
    }
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput) {
    const {email, password, token, verificationToken} = resetPasswordInput;
    const user: User = await this.userRepository.findOne({where: {email}});
    if (user) {
      const emailConfirmation = await this.emailService.confirmEmail(
        user,
        token,
        verificationToken,
        EmailTypeEnum.RESET_PASSWORD,
      );
      if (emailConfirmation) {
        user.password = await bcrypt.hash(password, user.salt);
        await this.userRepository.save(user);
      }
      return emailConfirmation;
    } else {
      throw new NotFoundException(USER_NOT_FOUND_ERROR_MESSAGE);
    }
  }
}

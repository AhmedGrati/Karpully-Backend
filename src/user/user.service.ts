import { HttpException, HttpStatus, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check } from 'prettier';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { CredentialsInput } from '../auth/dto/credentials.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEnum } from './entities/user-role.enum';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from '../email/email.service';
import { EmailTypeEnum } from '../email/entities/email-type.enum';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

    private readonly emailService: EmailService
  ){}


  async create(createUserInput: CreateUserInput): Promise<User> {
    // check if the user is unique or not
    let checkUser = await this.userRepository.findOne({username: createUserInput.username, email: createUserInput.email})
    if(!checkUser) {
      const user = await this.userRepository.create(createUserInput);
      await this.userRepository.save(user);
      // send a confirmation to the user
      this.emailService.sendEmail(user, EmailTypeEnum.CONFIRMATION);
      return user;
    }else{
      // if the user has the same username or email with someone else we throw an exception
      throw new HttpException("The User Already Exists", HttpStatus.BAD_REQUEST);
    }
    
  }

  async findAll() :Promise<User[]>{
    return await this.userRepository.find();
  }

  async findOne(user: User,id: number):Promise<User> {
    if(this.checkAuthorities(user, id)) {
      return await this.userRepository.findOne({where:{id}});
    }else{
      throw new UnauthorizedException();
    }
  }

  async update(currentUser:User,id: number, updateUserInput: UpdateUserInput) : Promise<User>{
    let user = await this.findOne(currentUser, id);

    // we check if the user is not found in the database we couldn't update so we throw an exception
    if (!user){
      throw new HttpException("User Not Found!",HttpStatus.NOT_FOUND);
    }else{
      // same process as create
      let checkUser = await this.userRepository.findOne({username: updateUserInput.username, email: updateUserInput.email})
      if(!checkUser) {
        const user = await this.userRepository.save(updateUserInput);
        return await this.userRepository.findOne({where:{id}});
      }else{
        // if the user has the same username or email with someone else we throw an exception
        throw new HttpException("The User Already Exists", HttpStatus.BAD_REQUEST);
      }
    }
  }

  async remove(user,id: number) :Promise<User>{
    const userToRemove = await this.findOne(user,id);
    await this.userRepository.delete(id);
    return userToRemove;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({where:{username}});
  }

  // a method which check the authority of a user
  checkAuthorities(user:User, id:number): boolean {
    // If the user is admin he has all authorities
    if(user.roles.indexOf(UserRoleEnum.ADMIN) > -1) {
      return true;
    }else {
      // else we check if the user who demand to find userById correspond to the actual user in database or not.
      return user.id === id;
    }
  }

}

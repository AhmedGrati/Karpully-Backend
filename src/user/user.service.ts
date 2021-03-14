import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check } from 'prettier';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}
  async create(createUserInput: CreateUserInput): Promise<User> {
    // check if the user is unique or not
    let checkUser = await this.userRepository.findOne({username: createUserInput.username, email: createUserInput.email})
    if(!checkUser) {
      const user = await this.userRepository.create(createUserInput);
      await this.userRepository.save(user);
      return user;
    }else{
      // if the user has the same username or email with someone else we throw an exception
      throw new HttpException("The User Already Exists", HttpStatus.BAD_REQUEST);
    }
    
  }

  async findAll() :Promise<User[]>{
    return await this.userRepository.find();
  }

  async findOne(id: number):Promise<User> {
    return await this.userRepository.findOne({where:{id}});
  }

  async update(id: number, updateUserInput: UpdateUserInput) : Promise<User>{
    let user = await this.userRepository.findOne({where: {id}});
    // we check if the user is not found in the database we couldn't update so we throw an exception
    if (!user){
      throw new HttpException("User Not Found!",HttpStatus.NOT_FOUND);
    }
    await this.userRepository.save(updateUserInput);
    return await this.userRepository.findOne({where:{id}});
  }

  async remove(id: number) :Promise<User>{
    const userToRemove = await this.findOne(id);
    await this.userRepository.delete(id);
    return userToRemove;
  }
}

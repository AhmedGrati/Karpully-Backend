import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsInput } from 'src/auth/dto/credentials.input';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { PayloadInterface } from './dto/payload.interface';
import { TokenModel } from './dto/token.model';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string) {
        const user = await this.userRepository.findOne({where:{username}});
        if(user && user.password === pass) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(credentials: CredentialsInput): Promise<TokenModel> {
        const {username, password} = credentials;
        const user = await this.userRepository.createQueryBuilder("user")
                    .where("user.username = :username or user.email = :username", {username})
                    .getOne();
        
        // if the user is null is means that we don't have any user with that email or password
        if (!user) {
            throw new NotFoundException("Your username and/or password do not match");
        }else{
          // if we get the user
          const hashedPassword = await bcrypt.hash(password, user.salt)
          // if the password is correct we sign the jwt and return it from the payload
          
          if (hashedPassword === user.password) {
            const payload: PayloadInterface = {
              username: user.username,
              roles: user.roles,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email
            }
            const jwt = await this.jwtService.sign(payload);
            return {
              "access_token": jwt
            }
          } else {
            // if the password is not equal to user.password that means that the credentials are not true
            throw new NotFoundException("Your username and/or password do not match");
          }
        }
    }
}

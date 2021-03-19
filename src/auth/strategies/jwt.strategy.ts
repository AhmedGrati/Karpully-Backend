import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../common/EnvironmentVariables';
import {PayloadInterface} from '../dto/payload.interface';
import {UserService} from '../../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET')
    });
  }

  async validate(payload: PayloadInterface) {
    const username: string = payload.username;
    const user = await this.userRepository.findOne({where:{username}});

    // if the user is not null or undefined which means that we find it
    if (user) {
      delete user.salt;
      delete user.password;
      return user;
    }else{
      // if we don't find the user it means that he's unauthorized
      throw new UnauthorizedException()
    }
  }
}
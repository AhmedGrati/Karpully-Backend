import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {JwtService, JwtSignOptions} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {CredentialsInput} from 'src/auth/dto/credentials.input';
import {User} from '../user/entities/user.entity';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {PayloadInterface} from './dto/payload.interface';
import {TokenModel} from './dto/token.model';
import {
  PASSWORD_LOGIN_MISSMATCH_ERROR_MESSAGE,
  ACCOUNT_NOT_ACTIVATED_ERROR_MESSAGE,
} from '../utils/constants';
import * as dotenv from 'dotenv';
import {TokenTypeEnum} from './dto/token-type.enum';
import {RedisCacheService} from '../redis-cache/redis-cache.service';
import {ConnectionService} from '../connection/connection.service';
import {ConnectionHistoricService} from '../connection-historic/connection-historic.service';
import {ConnectionHistoric} from 'src/connection-historic/entities/connection-historic.entity';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
    private readonly connectionService: ConnectionService,
    private readonly connectionHistoricService: ConnectionHistoricService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userRepository.findOne({where: {username}});
    if (user && user.password === pass) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async generateJwtToken(payload: PayloadInterface, tokenType: TokenTypeEnum) {
    switch (tokenType) {
      case TokenTypeEnum.ACCESS:
        return await this.jwtService.sign(payload);
      case TokenTypeEnum.REFRESH:
        return await this.jwtService.sign(payload, {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: '1y',
        });
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    const payload = await this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
    if (payload) {
      const {iat, exp, ...data} = payload;
      return data;
    } else {
      throw new UnauthorizedException();
    }
  }

  async refreshToken(refreshToken: string): Promise<TokenModel> {
    const payload = await this.verifyRefreshToken(refreshToken);
    if (payload) {
      const {username} = payload;
      const storedRefreshToken = await this.redisCacheService.get(username);
      if (storedRefreshToken === refreshToken) {
        const newAccessToken = await this.generateJwtToken(
          payload,
          TokenTypeEnum.ACCESS,
        );
        const newRefreshToken = await this.generateJwtToken(
          payload,
          TokenTypeEnum.REFRESH,
        );
        const user = await this.userRepository.findOne({
          where: {username},
        });
        await this.redisCacheService.set(username, newRefreshToken);
        return {
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
          user,
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(credentials: CredentialsInput): Promise<TokenModel> {
    const {username, password} = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username or user.email = :username', {username})
      .getOne();

    // if the user is null is means that we don't have any user with that email or password
    if (!user) {
      throw new NotFoundException(PASSWORD_LOGIN_MISSMATCH_ERROR_MESSAGE);
    } else if (!user.isConfirmed) {
      throw new UnauthorizedException(ACCOUNT_NOT_ACTIVATED_ERROR_MESSAGE);
    } else {
      // if we get the user
      const hashedPassword = await bcrypt.hash(password, user.salt);
      // if the password is correct we sign the jwt and return it from the payload
      if (hashedPassword === user.password) {
        const payload: PayloadInterface = {
          username: user.username,
          roles: user.roles,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        };
        const accessToken = await this.generateJwtToken(
          payload,
          TokenTypeEnum.ACCESS,
        );
        const refreshToken = await this.generateJwtToken(
          payload,
          TokenTypeEnum.REFRESH,
        );
        // add the new refresh token to the cache
        await this.redisCacheService.set(user.username, refreshToken);
        // register the connection
        this.registerConnection(user);
        // return result
        return {
          access_token: accessToken,
          refresh_token: refreshToken,
          user,
        };
      } else {
        // if the password is not equal to user.password that means that the credentials are not true
        throw new NotFoundException(PASSWORD_LOGIN_MISSMATCH_ERROR_MESSAGE);
      }
    }
  }

  async registerConnection(user: User) {
    const {id} = user;
    // fetch the connection historic of the user (by user id)

    let connectionHistoric: ConnectionHistoric = await this.connectionHistoricService.findOneByUserId(
      id,
    );
    if (!connectionHistoric) {
      connectionHistoric = await this.connectionHistoricService.create(user);
    }

    // create new connection entity
    const connection = await this.connectionService.create(connectionHistoric);

    // save the historic
    await this.connectionHistoricService.updateConnectionHistoric(
      connectionHistoric,
    );
  }
}

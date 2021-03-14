import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {EnvironmentVariables} from '../common/EnvironmentVariables';
require('dotenv').config();

class DatabaseConfigService {

  constructor(private readonly configService: ConfigService<EnvironmentVariables>) { }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('USER_NAME'),
      password: this.configService.get<string>('PASSWORD'),
      database: this.configService.get<string>('DATABASE'),

      entities: ['./src/**/*.entity{.ts,.js}','./dist/**/*.entity{.ts,.js}'],
      logging:true
    };
  }

}

const databaseConfigService = new DatabaseConfigService(new ConfigService<EnvironmentVariables>()).getTypeOrmConfig();

export { databaseConfigService };
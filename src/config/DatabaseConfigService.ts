import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {EnvironmentVariables} from '../common/EnvironmentVariables';
require('dotenv').config();
const os = require('os')
class DatabaseConfigService {

  constructor(private readonly configService: ConfigService<EnvironmentVariables>) { }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    let delimiter;
    if(os.platform() == 'win32') {
      delimiter="\\";
    }else{
      delimiter="/";
    }
    const path = __dirname.split(delimiter);
    const entitiesPath = path.splice(0,path.length -1).join(delimiter);
    return {
      type: 'postgres',
      host: this.configService.get<string>('HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('USER_NAME'),
      password: this.configService.get<string>('PASSWORD'),
      database: this.configService.get<string>('DATABASE'),

      entities: [entitiesPath+'/**/*.entity{.ts,.js}'],
      // logging:true,
      synchronize:true
    };
  }

}

const databaseConfigService = new DatabaseConfigService(new ConfigService<EnvironmentVariables>()).getTypeOrmConfig();

export { databaseConfigService };
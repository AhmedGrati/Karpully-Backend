import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class DatabaseConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('USER_NAME'),
      password: this.getValue('PASSWORD'),
      database: this.getValue('DATABASE'),

      entities: ['./src/**/*.entity{.ts,.js}','./dist/**/*.entity{.ts,.js}'],
      logging:true,
      synchronize:true
    };
  }

}

const databaseConfigService = new DatabaseConfigService(process.env)
  .ensureValues([
    'HOST',
    'PORT',
    'USER_NAME',
    'PASSWORD',
    'DATABASE'
  ]);

export { databaseConfigService };
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigService } from './config/DatabaseConfigService';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UserModule, TypeOrmModule.forRoot(databaseConfigService), ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

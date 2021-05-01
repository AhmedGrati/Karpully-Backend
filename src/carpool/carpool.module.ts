import { LocationModule } from './../location/location.module';
import { Location } from './../location/entities/location.entity';
import { Module } from '@nestjs/common';
import { CarpoolService } from './carpool.service';
import { CarpoolResolver } from './carpool.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carpool } from './entities/carpool.entity';
import { UserModule } from '../user/user.module';
import { CityModule } from '../city/city.module';
import { CaslModule } from '../casl/casl.module';

@Module({
  providers: [CarpoolResolver, CarpoolService],
  imports: [
    TypeOrmModule.forFeature([Carpool, Location]),
    UserModule,
    CityModule,
    CaslModule,
    LocationModule
  ],
  exports: [CarpoolService],
})
export class CarpoolModule { }

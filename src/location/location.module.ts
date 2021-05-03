import { Address } from './entities/address.entity';
import { Location } from './entities/location.entity';
import { HttpModule, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, UserModule, TypeOrmModule.forFeature([Location, Address])],
  providers: [LocationResolver, LocationService],
  exports: [LocationService]
})
export class LocationModule { }

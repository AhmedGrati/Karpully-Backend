import { LocationModule } from './../../location/location.module';
import { Module } from '@nestjs/common';
import { FakerAddressService } from './faker-address.service';

@Module({
  providers: [FakerAddressService],
  imports: [LocationModule],
  exports: [FakerAddressService]
})
export class FakerAddressModule { }

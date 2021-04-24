import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';

@Module({
  providers: [LocationResolver, LocationService]
})
export class LocationModule {}

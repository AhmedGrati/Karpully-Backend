import { Module } from '@nestjs/common';
import { FakerCityService } from './faker-city.service';

@Module({
  providers: [FakerCityService]
})
export class FakerCityModule {}

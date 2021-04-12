import { Module } from '@nestjs/common';
import { CityModule } from '../../city/city.module';
import { FakerCityService } from './faker-city.service';

@Module({
  providers: [FakerCityService],
  imports: [CityModule]
})
export class FakerCityModule {}

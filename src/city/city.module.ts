import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityResolver } from './city.resolver';

@Module({
  providers: [CityResolver, CityService]
})
export class CityModule {}

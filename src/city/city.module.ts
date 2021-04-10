import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityResolver } from './city.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { GovModule } from '../gov/gov.module';

@Module({
  providers: [CityResolver, CityService],
  imports:[TypeOrmModule.forFeature([City]), GovModule],
  exports: [CityService]
})
export class CityModule {}

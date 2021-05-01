import { Module } from '@nestjs/common';
import { LocationModule } from '../../location/location.module';
import { FakerLocationService } from './faker-location.service';

@Module({
  providers: [FakerLocationService],
  imports: [LocationModule],
  exports: [FakerLocationService]

})
export class FakerLocationModule { }

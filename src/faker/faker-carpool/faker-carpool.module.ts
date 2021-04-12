import { Module } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { CarpoolModule } from '../../carpool/carpool.module';
import { FakerCarpoolService } from './faker-carpool.service';
import { CityModule } from '../../city/city.module';

@Module({
  providers: [FakerCarpoolService],
  imports: [CarpoolModule, UserModule, CityModule]
})
export class FakerCarpoolModule {}

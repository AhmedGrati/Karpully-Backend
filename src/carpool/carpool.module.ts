import { Module } from '@nestjs/common';
import { CarpoolService } from './carpool.service';
import { CarpoolResolver } from './carpool.resolver';

@Module({
  providers: [CarpoolResolver, CarpoolService]
})
export class CarpoolModule {}

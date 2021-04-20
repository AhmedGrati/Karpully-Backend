import { Module } from '@nestjs/common';
import { AhmedService } from './ahmed.service';
import { AhmedResolver } from './ahmed.resolver';

@Module({
  providers: [AhmedResolver, AhmedService]
})
export class AhmedModule {}

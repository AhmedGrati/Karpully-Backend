import { Module } from '@nestjs/common';
import { GovService } from './gov.service';
import { GovResolver } from './gov.resolver';

@Module({
  providers: [GovResolver, GovService]
})
export class GovModule {}

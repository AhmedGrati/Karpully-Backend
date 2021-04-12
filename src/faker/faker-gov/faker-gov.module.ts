import { Module } from '@nestjs/common';
import { GovModule } from '../../gov/gov.module';
import { FakerGovService } from './faker-gov.service';

@Module({
  providers: [FakerGovService],
  imports: [GovModule]
})
export class FakerGovModule {}

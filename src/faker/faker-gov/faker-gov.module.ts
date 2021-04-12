import { Module } from '@nestjs/common';
import { FakerGovService } from './faker-gov.service';

@Module({
  providers: [FakerGovService]
})
export class FakerGovModule {}

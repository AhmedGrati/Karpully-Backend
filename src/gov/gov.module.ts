import { Module } from '@nestjs/common';
import { GovService } from './gov.service';
import { GovResolver } from './gov.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gov } from './entities/gov.entity';

@Module({
  providers: [GovResolver, GovService],
  imports:[TypeOrmModule.forFeature([Gov])],
  exports:[GovService]
})
export class GovModule {}

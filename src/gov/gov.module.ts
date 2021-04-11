import { Module } from '@nestjs/common';
import { GovService } from './gov.service';
import { GovResolver } from './gov.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gov } from './entities/gov.entity';
import { CaslModule } from '../casl/casl.module';

@Module({
  providers: [GovResolver, GovService],
  imports:[TypeOrmModule.forFeature([Gov]), CaslModule],
  exports:[GovService]
})
export class GovModule {}

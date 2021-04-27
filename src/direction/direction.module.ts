import { Module } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionResolver } from './direction.resolver';

@Module({
  providers: [DirectionResolver, DirectionService]
})
export class DirectionModule {}

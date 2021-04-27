import { Module, HttpModule } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionResolver } from './direction.resolver';

@Module({
  providers: [DirectionResolver, DirectionService],
  imports: [HttpModule]
})
export class DirectionModule { }

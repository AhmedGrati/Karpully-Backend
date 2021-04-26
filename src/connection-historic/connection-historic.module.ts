import {Module} from '@nestjs/common';
import {ConnectionHistoricService} from './connection-historic.service';
import {ConnectionHistoricResolver} from './connection-historic.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConnectionHistoric} from './entities/connection-historic.entity';

@Module({
  providers: [ConnectionHistoricResolver, ConnectionHistoricService],
  imports: [TypeOrmModule.forFeature([ConnectionHistoric])],
  exports: [ConnectionHistoricService],
})
export class ConnectionHistoricModule {}

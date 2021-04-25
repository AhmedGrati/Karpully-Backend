import { Module } from '@nestjs/common';
import { ConnectionHistoricService } from './connection-historic.service';
import { ConnectionHistoricResolver } from './connection-historic.resolver';

@Module({
  providers: [ConnectionHistoricResolver, ConnectionHistoricService]
})
export class ConnectionHistoricModule {}

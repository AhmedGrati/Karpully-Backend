import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConnectionService} from './connection.service';
import {Connection} from './entities/connection.entity';

@Module({
  providers: [ConnectionService],
  imports: [TypeOrmModule.forFeature([Connection])],
  exports: [ConnectionService],
})
export class ConnectionModule {}

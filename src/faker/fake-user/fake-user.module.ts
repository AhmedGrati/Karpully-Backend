import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { FakeUserService } from './fake-user.service';

@Module({
  providers: [FakeUserService],
  imports: [TypeOrmModule.forFeature([User]),]
})
export class FakeUserModule {}

import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionResolver } from './submission.resolver';
import { CarpoolModule } from '../carpool/carpool.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { CaslModule } from '../casl/casl.module';

@Module({
  providers: [SubmissionResolver, SubmissionService],
  imports: [CarpoolModule, UserModule, TypeOrmModule.forFeature([Submission]), CaslModule]
})
export class SubmissionModule {}

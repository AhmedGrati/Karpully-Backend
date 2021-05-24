import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImgUpload } from '../../profile-img-upload/entities/profile-img-upload.entity';
import { ProfileImgUploadModule } from '../../profile-img-upload/profile-img-upload.module';
import { User } from '../../user/entities/user.entity';
import { FakeUserService } from './fake-user.service';

@Module({
  providers: [FakeUserService],
  imports: [TypeOrmModule.forFeature([User, ProfileImgUpload]), ProfileImgUploadModule],
  exports: [FakeUserService],
})
export class FakeUserModule { }

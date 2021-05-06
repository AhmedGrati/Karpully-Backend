import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { ProfileImgUploadService } from './profile-img-upload.service';
import { ProfileImgUploadController } from './profile-img-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImgUpload } from './entities/profile-img-upload.entity';
@Module({
  imports: [MulterModule.register({
    dest: 'src/images',
  }),
  TypeOrmModule.forFeature([ProfileImgUpload]),
    UserModule],
  controllers: [ProfileImgUploadController],
  providers: [ProfileImgUploadService]
})
export class ProfileImgUploadModule { }

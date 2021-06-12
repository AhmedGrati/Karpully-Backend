import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Query, Res } from '@nestjs/common';
import { ProfileImgUploadService } from './profile-img-upload.service';
import { CreateProfileImgUploadDto } from './dto/create-profile-img-upload.dto';
import { UpdateProfileImgUploadDto } from './dto/update-profile-img-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('profile-img-upload')
export class ProfileImgUploadController {
  constructor(private readonly profileImgUploadService: ProfileImgUploadService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'src/images',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        }
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      }
    }),
  )
  // @CurrentUser()
  create(@CurrentUser() user: User, @UploadedFile() file: any, @Res() res) {
    return this.profileImgUploadService.create(file, user, res);
  }


  @Get()
  findOne(@Query('imgId') image: number, @Res() res) {
    // return this.profileImgUploadService.findOne(image)
    return this.profileImgUploadService.findOne(image, res)

  }

}

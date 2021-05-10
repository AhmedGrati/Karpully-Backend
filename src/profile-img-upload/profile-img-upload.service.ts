import { ProfileImgUpload } from './entities/profile-img-upload.entity';
import { Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { extname } from 'path';
import { CreateProfileImgUploadDto } from './dto/create-profile-img-upload.dto';
import { UpdateProfileImgUploadDto } from './dto/update-profile-img-upload.dto';
import { Repository } from 'typeorm';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { FAILURE_UPON_PROFULE_IMAGE_UPDATE } from '../utils/constants';

@Injectable()
export class ProfileImgUploadService {
  constructor(@InjectRepository(ProfileImgUpload) private readonly imageRepository: Repository<ProfileImgUpload>,
    private readonly userService: UserService) { }


  async create(file: any, user: number, res) {
    const newImage = this.imageRepository.create({
      name: file.filename
    })
    const savedImage = await this.imageRepository.save(newImage)

    await this.userService.updateImage(user, savedImage).catch(e => {
      throw new Error(FAILURE_UPON_PROFULE_IMAGE_UPDATE)
    })

    return res.set({ 'filename': file.filename, 'imageId': savedImage.id })
      .sendFile(savedImage.name, { root: './src/images' })

  }

  findAll() {
    return `This action returns all profileImgUpload`;
  }

  async findOne(id: number, res: any) {
    const img = await this.imageRepository.findOne(id)
    return res.set({ 'filename': img.name, 'imageId': img.id })
      .sendFile(img.name, { root: './src/images' })
  }

  update(id: number, updateProfileImgUploadDto: UpdateProfileImgUploadDto) {
    return `This action updates a #${id} profileImgUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileImgUpload`;
  }
}

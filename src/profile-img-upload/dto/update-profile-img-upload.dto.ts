import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileImgUploadDto } from './create-profile-img-upload.dto';

export class UpdateProfileImgUploadDto extends PartialType(CreateProfileImgUploadDto) {}

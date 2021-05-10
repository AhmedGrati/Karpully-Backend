import { Test, TestingModule } from '@nestjs/testing';
import { ProfileImgUploadService } from './profile-img-upload.service';

describe('ProfileImgUploadService', () => {
  let service: ProfileImgUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileImgUploadService],
    }).compile();

    service = module.get<ProfileImgUploadService>(ProfileImgUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import {Test, TestingModule} from '@nestjs/testing';
import {ProfileImgUploadController} from './profile-img-upload.controller';
import {ProfileImgUploadService} from './profile-img-upload.service';

describe('ProfileImgUploadController', () => {
  let controller: ProfileImgUploadController;
  const mockProfileImgUploadService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileImgUploadController],
      providers: [ProfileImgUploadService],
    })
      .overrideProvider(ProfileImgUploadService)
      .useValue(mockProfileImgUploadService)
      .compile();

    controller = module.get<ProfileImgUploadController>(
      ProfileImgUploadController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from 'src/user/user.service';
import {ProfileImgUploadService} from './profile-img-upload.service';

describe('ProfileImgUploadService', () => {
  let service: ProfileImgUploadService;
  const mockProfileImgUploadService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileImgUploadService],
    })
      .overrideProvider(ProfileImgUploadService)
      .useValue(mockProfileImgUploadService)
      .compile();

    service = module.get<ProfileImgUploadService>(ProfileImgUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

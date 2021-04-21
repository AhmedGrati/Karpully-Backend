import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {CarpoolService} from '../carpool/carpool.service';
import {CaslAbilityFactory} from '../casl/casl-ability.factory';
import {NotificationService} from '../notification/notification.service';
import {CreateSubmissionInput} from './dto/create-submission.input';
import {Submission} from './entities/submission.entity';
import {SubmissionService} from './submission.service';

/* 
Submission Service Unit tests will lead to a tight coupling between test and the actual implementation
so we won't do it

*/
describe('SubmissionService', () => {
  let service: SubmissionService;
  const mockSubmissionRepository = {
    create: jest.fn().mockImplementation((owner, dto) => {
      return Promise.resolve({
        id: 1,
        ...dto,
      });
    }),
    findOne: jest.fn().mockImplementation((id) => {
      return Promise.resolve({
        id,
      });
    }),
  };
  const mockNotificationService = {};
  const mockcaslFactory = {};
  const mockCarpoolService = {
    findOne: jest.fn().mockImplementation((id) => {
      return Promise.resolve({
        id,
      });
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionService,
        CarpoolService,
        NotificationService,
        CaslAbilityFactory,
        {
          provide: getRepositoryToken(Submission),
          useValue: mockSubmissionRepository,
        },
      ],
    })
      .overrideProvider(CarpoolService)
      .useValue(mockCarpoolService)
      .overrideProvider(NotificationService)
      .useValue(mockNotificationService)
      .overrideProvider(CaslAbilityFactory)
      .useValue(mockcaslFactory)
      .compile();

    service = module.get<SubmissionService>(SubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

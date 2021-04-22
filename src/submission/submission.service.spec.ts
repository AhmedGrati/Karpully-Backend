import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Carpool} from '../carpool/entities/carpool.entity';
import {Notification} from '../notification/entities/notification.entity';
import {CarpoolService} from '../carpool/carpool.service';
import {CaslAbilityFactory} from '../casl/casl-ability.factory';
import {NotificationService} from '../notification/notification.service';
import {Submission} from './entities/submission.entity';
import {SubmissionService} from './submission.service';
import {User} from '../user/entities/user.entity';
import {CreateSubmissionInput} from './dto/create-submission.input';
import {QueryBuilder, SelectQueryBuilder} from 'typeorm';
import {Where} from 'src/carpool/dto/where.input';
import {Status} from './entities/status.enum';
import {UpdateSubmissionInput} from './dto/update-submission.input';

describe('SubmissionService', () => {
  let service: SubmissionService;
  const carpool = new Carpool();
  const owner = new User();
  owner.id = 55;
  carpool.owner = owner;
  carpool.nbrOfAvailablePlaces = 4;
  carpool.departureDate = new Date('11/10/2500');
  const user = new User();
  const createSubmissionInput: CreateSubmissionInput = {} as CreateSubmissionInput;
  const notification: Notification = new Notification();
  const pendingsubmission: Submission = new Submission();
  pendingsubmission.status = Status.PENDING;
  pendingsubmission.carpool = carpool;
  const rejectedsubmission: Submission = new Submission();
  rejectedsubmission.status = Status.REJECTED;
  const acceptedsubmission: Submission = new Submission();
  acceptedsubmission.status = Status.ACCEPTED;

  const updateSubmissionInput: UpdateSubmissionInput = {} as UpdateSubmissionInput;
  const mockSubmissionRepository = {
    create: jest.fn().mockResolvedValue(pendingsubmission),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(pendingsubmission),
    update: jest.fn().mockImplementation(async (subId, data) => {
      return Promise.resolve({
        raw: [data],
      });
    }),
  };
  const mockCarpoolService = {
    findOne: jest.fn().mockReturnValue(carpool),
    updateCarpool: jest.fn().mockResolvedValue(carpool),
  };
  const mockCaslAbilityFactory = {};
  const mockNotificationService = {
    publishNotification: jest.fn().mockReturnValue(notification),
    create: jest.fn().mockResolvedValue(notification),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionService,
        {
          provide: getRepositoryToken(Submission),
          useValue: mockSubmissionRepository,
        },
        CarpoolService,
        NotificationService,
        CaslAbilityFactory,
      ],
    })
      .overrideProvider(CaslAbilityFactory)
      .useValue(mockCaslAbilityFactory)
      .overrideProvider(CarpoolService)
      .useValue(mockCarpoolService)
      .overrideProvider(NotificationService)
      .useValue(mockNotificationService)
      .compile();

    service = module.get<SubmissionService>(SubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a list of all submissions', async () => {
    expect(await service.findAll()).toEqual([]);
    expect(mockSubmissionRepository.find).toBeCalled();
  });

  it('should return a submission with specific id', async () => {
    expect(await service.findOne(1)).toBeDefined();
    expect(mockSubmissionRepository.findOne).toBeCalled();
  });
  // the same goes for accept submission
  it('should reject a submission with specific id', async () => {
    expect(
      (await service.rejectSubmission(owner, 1, updateSubmissionInput)).status,
    ).toBeDefined();
    expect(mockSubmissionRepository.findOne).toHaveBeenCalled();
  });
});

import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotificationService} from '../notification/notification.service';
import {UserService} from '../user/user.service';
import {Invitation} from './entities/invitation.entity';
import {InvitationService} from './invitation.service';

describe('InvitationService', () => {
  let service: InvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvitationService,
        UserService,
        NotificationService,
        {
          provide: getRepositoryToken(Invitation),
          useValue: {},
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue({})
      .overrideProvider(NotificationService)
      .useValue({})
      .compile();

    service = module.get<InvitationService>(InvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {PubSub} from 'graphql-subscriptions';
import {User} from '../user/entities/user.entity';
import {Notification} from './entities/notification.entity';
import {NotificationService} from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  const notification = new Notification();
  const receiver = new User();
  const content = 'content';
  notification.receiver = receiver;
  notification.content = content;
  const topicName = 'User_1';
  const mockNotificationRepository = {
    create: jest.fn().mockReturnValue(notification),
    save: jest.fn().mockImplementation((dto) => {
      return Promise.resolve({
        id: 1,
        ...dto,
      });
    }),
    findOne: jest.fn().mockResolvedValue(notification),
  };
  const mockPubSub = {
    publish: jest.fn().mockReturnValue(notification),
    asyncIterator: jest.fn().mockReturnValue(notification),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getRepositoryToken(Notification),
          useValue: mockNotificationRepository,
        },
        {
          provide: 'PUB_SUB',
          useValue: mockPubSub,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find notification with the specific id', async () => {
    expect(await service.findOne(1)).toBeDefined();
    expect(await service.findOne(1)).toMatchObject(notification);
    expect(mockNotificationRepository.findOne).toBeCalled();
  });
  it('should create a notification', async () => {
    expect(await service.create(receiver, content)).toBeDefined();
    expect(await service.create(receiver, content)).toMatchObject(notification);
    expect(mockNotificationRepository.create).toBeCalled();
    expect(mockNotificationRepository.save).toBeCalled();
  });
  it('should publish a notification', () => {
    expect(service.publishNotification).toBeDefined();
  });
  it('should accept published notification', () => {
    expect(service.notification).toBeDefined();
    expect(service.notification(1)).toMatchObject(notification);
    expect(mockPubSub.asyncIterator).toBeCalledWith(topicName);
  });
});

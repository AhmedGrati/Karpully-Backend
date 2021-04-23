import {Test, TestingModule} from '@nestjs/testing';
import {NotificationResolver} from './notification.resolver';
import {NotificationService} from './notification.service';
import {Notification} from './entities/notification.entity';
import {PaginatedNotification} from './entities/paginatedNotification.entity';
import {PaginationInput} from 'src/generics/pagination.input';
describe('NotificationResolver', () => {
  let resolver: NotificationResolver;
  const notification = new Notification();
  const allNotifications = [
    new Notification(),
    new Notification(),
    new Notification(),
  ];
  const paginatedNotification: PaginatedNotification = {
    items: allNotifications,
    meta: {
      currentPage: 1,
      itemCount: 3,
    },
  };
  const userId = 1;
  const paginationInput: PaginationInput = {
    limit: 20,
    page: 1,
  };
  const mockNotificationService = {
    notification: jest.fn().mockReturnValue(notification),
    findOne: jest.fn().mockReturnValue(notification),
    findAllByUserId: jest.fn().mockReturnValue(paginatedNotification),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationResolver, NotificationService],
    })
      .overrideProvider(NotificationService)
      .useValue(mockNotificationService)
      .compile();

    resolver = module.get<NotificationResolver>(NotificationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should subscribe to a notification', () => {
    expect(resolver.notification(1)).toBeDefined();
    expect(resolver.notification(1)).toMatchObject(notification);
    expect(mockNotificationService.notification).toBeCalled();
  });

  it('should find a notification with the specific id', () => {
    expect(resolver.findOne(1)).toBeDefined();
    expect(resolver.findOne(1)).toMatchObject(notification);
    expect(mockNotificationService.findOne).toBeCalled();
  });
  it('should find all notifications by user id', async () => {
    expect(
      resolver.findAllNotificationsByUserId(userId, paginationInput),
    ).toBeDefined();
    expect(
      resolver.findAllNotificationsByUserId(userId, paginationInput),
    ).toMatchObject(paginatedNotification);
    expect(
      await (
        await resolver.findAllNotificationsByUserId(userId, paginationInput)
      ).items.length,
    ).toEqual(3);
    expect(mockNotificationService.findAllByUserId).toBeCalled();
  });
});

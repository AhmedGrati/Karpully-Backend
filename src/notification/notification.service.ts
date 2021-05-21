import {Inject, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {BASE_TOPIC_NAME} from '../utils/constants';
import {Repository} from 'typeorm';
import {CreateNotificationInput} from './dto/create-notification.input';
import {UpdateNotificationInput} from './dto/update-notification.input';
import {Notification} from './entities/notification.entity';
import {PubSub} from 'graphql-subscriptions';
import {Pagination} from '../utils/pagination';
import {PaginationInput} from '../generics/pagination.input';
import {PaginatedNotification} from './entities/paginatedNotification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}
  // user Id is the triggerer id
  async create(
    receiver: User,
    content: string,
    userId: number,
    carpoolId?: number,
  ): Promise<Notification> {
    const notification = await this.notificationRepository.create();
    notification.content = content;
    notification.receiver = receiver;
    notification.meta = {carpoolId, userId};
    return await this.notificationRepository.save(notification);
  }

  notification(userId: number) {
    return this.pubSub.asyncIterator(BASE_TOPIC_NAME + userId);
  }

  async findOne(id: number) {
    return await this.notificationRepository.findOne({where: {id}});
  }

  publishNotification(notification: Notification) {
    this.pubSub.publish(BASE_TOPIC_NAME + notification.receiver.id, {
      notification,
    });
  }

  async findAllByUserId(
    userId: number,
    paginationInput: PaginationInput,
  ): Promise<PaginatedNotification> {
    const queryBuilder = this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.receiver.id = :userId', {userId})
      .leftJoinAndSelect('notification.receiver', 'user');
    return await Pagination.paginateQueryBuilder<Notification>(
      queryBuilder,
      this.notificationRepository,
      paginationInput,
    );
  }

  // update(id: number, updateNotificationInput: UpdateNotificationInput) {
  //   return `This action updates a #${id} notification`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} notification`;
  // }
}

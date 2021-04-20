import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import {NotificationService} from './notification.service';
import {Notification} from './entities/notification.entity';
import {Logger} from '@nestjs/common';
import {PaginationInput} from '../generics/pagination.input';
import {PaginatedNotification} from './entities/paginatedNotification.entity';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  // @Mutation(() => Notification)
  // createNotification(@Args('createNotificationInput') createNotificationInput: CreateNotificationInput) {
  //   return this.notificationService.create(createNotificationInput);
  // }

  // IMPORTANT: The name of the subscription should be the same as the name of the payload
  @Subscription(() => Notification, {
    filter: (payload, variables) => {
      return variables.userId === payload.notification.receiver.id;
    },
  })
  notification(@Args('userId') userId: number) {
    return this.notificationService.notification(userId);
  }

  @Query(() => Notification, {name: 'notification'})
  findOne(@Args('id', {type: () => Int}) id: number) {
    return this.notificationService.findOne(id);
  }

  @Query(() => PaginatedNotification, {name: 'notifications'})
  findAllNotificationsByUserId(
    @Args('userId') userId: number,
    @Args('paginationInput') paginationInput?: PaginationInput,
  ): Promise<PaginatedNotification> {
    return this.notificationService.findAllByUserId(userId, paginationInput);
  }

  // @Mutation(() => Notification)
  // updateNotification(@Args('updateNotificationInput') updateNotificationInput: UpdateNotificationInput) {
  //   return this.notificationService.update(updateNotificationInput.id, updateNotificationInput);
  // }

  // @Mutation(() => Notification)
  // removeNotification(@Args('id', { type: () => Int }) id: number) {
  //   return this.notificationService.remove(id);
  // }
}

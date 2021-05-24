import {registerEnumType} from '@nestjs/graphql';

export enum NotificationTypeEnum {
  SUBMISSION = 'submission',
  INVITATION = 'invitation',
}
registerEnumType(NotificationTypeEnum, {
  name: 'NotificationTypeEnum',
});

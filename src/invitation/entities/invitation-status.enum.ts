import {registerEnumType} from '@nestjs/graphql';

export enum InvitationStatusEnum {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PENDING = 'pending',
}
registerEnumType(InvitationStatusEnum, {
  name: 'InvitationStatusEnum',
});

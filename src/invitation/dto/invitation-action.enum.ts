import {registerEnumType} from '@nestjs/graphql';

export enum InvitationActionEnum {
  ACCEPT = 'accept',
  REJECT = 'reject',
}
registerEnumType(InvitationActionEnum, {
  name: 'InvitationActionEnum',
});

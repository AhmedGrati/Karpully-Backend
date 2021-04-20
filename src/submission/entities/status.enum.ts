import {registerEnumType} from 'type-graphql';

export enum Status {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

registerEnumType(Status, {
  name: 'Status',
});

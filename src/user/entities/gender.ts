import {registerEnumType} from '@nestjs/graphql';

export enum Gender {
  MALE,
  FEMALE,
}
registerEnumType(Gender, {
  name: 'Gender',
});

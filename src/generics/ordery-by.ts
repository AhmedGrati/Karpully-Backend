import { registerEnumType } from '@nestjs/graphql';

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
  
}

registerEnumType(OrderBy, { name: 'OrderBy' });
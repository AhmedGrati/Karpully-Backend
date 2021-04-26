import {ArgumentMetadata, PipeTransform} from '@nestjs/common';

export class TrimDataPipe implements PipeTransform<any, any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    const {username, email} = value;
    if (username) {
      value.username = value.username?.trim();
    }
    if (email) {
      value.email = value.email?.trim();
    }
    return value;
  }
}

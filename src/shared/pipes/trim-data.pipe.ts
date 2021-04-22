import {ArgumentMetadata, PipeTransform} from '@nestjs/common';

export class TrimDataPipe implements PipeTransform<any, any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    value.email = value.email?.trim();
    value.username = value.username?.trim();
    return value;
  }
}

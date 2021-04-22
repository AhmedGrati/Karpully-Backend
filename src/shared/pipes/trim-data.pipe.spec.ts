import {ArgumentMetadata, Logger} from '@nestjs/common';
import {TrimDataPipe} from './trim-data.pipe';

describe('ParseIntPipe', () => {
  let pipe: TrimDataPipe;

  const dto = {
    email: '         ahmed@gmail.com          ',
    username: '     Ahmed Grati       ',
  };

  const trimmedDto = {
    email: 'ahmed@gmail.com',
    username: 'Ahmed Grati',
  };
  const meta: ArgumentMetadata = {} as ArgumentMetadata;
  beforeEach(() => {
    pipe = new TrimDataPipe();
  });
  it('should be defined', () => {
    Logger.log(pipe);
    expect(pipe).toBeDefined();
  });
  describe('successful calls', () => {
    pipe = new TrimDataPipe();
    expect(pipe.transform(dto, meta)).toStrictEqual(trimmedDto);
  });
});

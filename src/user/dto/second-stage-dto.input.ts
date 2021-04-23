import {Field, InputType} from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import {Gender} from '../entities/gender';

@InputType()
export class SecondStageDTOInput {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  localization: string;

  @Field()
  @IsPhoneNumber()
  @IsNotEmpty()
  telNumber: string;

  @Field()
  @IsNotEmpty()
  firstname: string;

  @Field()
  @IsNotEmpty()
  lastname: string;

  @Field()
  @Min(5)
  @Max(100)
  @IsNotEmpty()
  age: number;

  @Field()
  gender: Gender;
}

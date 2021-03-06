import {
  Field,
  ID,
  InputType,
  ObjectType,
  Int,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import {Gender} from '../entities/gender';
import {FirstStageDTOInput} from './first-stage-dto.input';
import {SecondStageDTOInput} from './second-stage-dto.input';
type a = FirstStageDTOInput | SecondStageDTOInput;
@InputType()
export class CreateUserInput {
  @Field((type) => Int, {nullable: true})
  id: number;

  @Field()
  @IsNotEmpty()
  username: string;

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

  @Field({nullable: true})
  @Min(0)
  @Max(5)
  rate: number;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  localization: string;

  @Field()
  @IsPhoneNumber()
  @IsNotEmpty()
  telNumber: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => [String], {nullable: true})
  roles?: string[];

  @Field()
  gender: Gender;
}

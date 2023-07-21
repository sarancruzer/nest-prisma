import { IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(SignupUserDto) {}

export class RequestDto {
  message: string;
  status: string;
  data: object;
}

export class ResponseDto {
  message: string;
  status: string;
  data: object;
  token?: string;
}

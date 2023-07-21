import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class LoginUserDto {

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

@Exclude()
export class UserTokenDto {

    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    mobileNumber: string;

    @Expose()
    token: string;

    @Expose()
    passwordFlag: number;

    @Expose()
    emailVerify: number;   
}

@Exclude()
export class TokenDto {

    @Expose()
    expiresIn: number;
    @Expose()
    user: UserTokenDto;
    @Expose()
    token: string;
}




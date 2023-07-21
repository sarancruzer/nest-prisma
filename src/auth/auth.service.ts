import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { SignupUserDto } from './dto/auth-dto';
import { LoginUserDto, TokenDto, UserTokenDto } from './dto/login-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayloadService } from 'src/shared/services/jwt-payload.service';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel } from '@prisma/client';

@Injectable()
export class AuthService {
  secret = '';
  expiresIn = '';
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private prisma: PrismaService,
    private jwtPayloadService: JwtPayloadService,
  ) {
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = process.env.JWT_EXPIRESIN;
  }

  async register(signupUserDto: SignupUserDto): Promise<UserModel> {
    this.logger.log('register started');
    const errors = await validate(signupUserDto); // Validate Fileds
    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
    const { email, password } = signupUserDto;
    const isExistUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(
      '🚀 ~ file: auth.service.ts:40 ~ AuthService ~ register ~ isExistUser:',
      isExistUser,
    );
    if (isExistUser) {
      this.logger.error('User already exists');
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
    signupUserDto.password = bcrypt.hashSync(password, 10);
    console.log(
      '🚀 ~ file: auth.service.ts:49 ~ AuthService ~ register ~ signupUserDto:',
      signupUserDto,
    );
    const newUser = await this.prisma.user.create({
      data: {
        ...signupUserDto,
      },
    });
    return newUser;
  }

  async authenticate(loginUserDto: LoginUserDto): Promise<TokenDto> {
    this.logger.log('authenticate started');

    const errors = await validate(loginUserDto); // Validate Fileds
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    const { email } = loginUserDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const error = { message: loginUserDto.email + ' User not found' };
    if (!user) {
      this.logger.log('User not found');
      throw new HttpException({ errors: error }, HttpStatus.UNAUTHORIZED);
    }

    if (bcrypt.compareSync(loginUserDto.password, user.password)) {
      const userData = plainToClass(UserTokenDto, user);
      const tokenData: TokenDto = await this.jwtPayloadService
        .createJwtPayload(userData)
        .then((res) => res);
      return tokenData;
    }
    this.logger.log('Password is wrongg!');
    throw new HttpException(
      { errors: { message: 'Password is wrongg!' } },
      HttpStatus.UNAUTHORIZED,
    );
  }

  async findOne(username: string): Promise<UserModel | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findOne(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}

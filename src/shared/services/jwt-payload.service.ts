import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDto } from 'src/auth/dto/login-user.dto';
import { JwtPayload } from 'src/auth/interface/auth.interface';
import { EXPIRES_IN } from '../constants';

@Injectable()
export class JwtPayloadService {
  constructor(private readonly jwtService: JwtService) {}

  generateResetPasswordToken(email: string) {
    return this.jwtService.sign({ email }, { expiresIn: EXPIRES_IN });
  }

  verify(token: string) {
    try {
      this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }

  decode(token: string) {
    return this.jwtService.decode(token);
  }

  async createJwtPayload(userTokenDto: UserTokenDto | any): Promise<any> {
    const data: JwtPayload = { ...userTokenDto };

    try {
      const jwt = this.jwtService.sign(data);
      return {
        expiresIn: EXPIRES_IN,
        token: jwt,
        user: { ...userTokenDto },
      };
    } catch (error) {
      throw new HttpException(
        'Internal Server error:' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

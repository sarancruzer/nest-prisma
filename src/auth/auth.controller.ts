import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Inject,
  UseFilters,
} from '@nestjs/common';
import { ResponseDto, SignupUserDto } from './dto/auth-dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AUTH_SERVICE, IAuthService } from './interface/auth.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/shared/exception-filters/http-exception.filter';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // User register
  @ApiBody({ type: SignupUserDto })
  @Post('register')
  async userRegister(
    @Body() signupUserDto: SignupUserDto,
  ): Promise<ResponseDto> {
    const res = await this.authService.register(signupUserDto);
    return this.customResponse(
      res,
      'User Register successfully',
      HttpStatus.OK.toString(),
    );
  }

  // User authentication
  @ApiBody({ type: LoginUserDto })
  @UseFilters(new HttpExceptionFilter())
  @Post('authenticate')
  async authenticate(@Body() loginUserDto: LoginUserDto): Promise<any> {
    const res = await this.authService.authenticate(loginUserDto);
    return { message: 'Login successss', result: res };
  }
  async customResponse(data: object, message: string, status: string) {
    const dto = new ResponseDto();
    dto.status = status;
    dto.message = message;
    dto.data = data;
    return dto;
  }
}

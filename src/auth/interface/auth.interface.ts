import { SignupUserDto } from '../dto/auth-dto';
import { LoginUserDto, TokenDto, UserTokenDto } from '../dto/login-user.dto';
export const AUTH_SERVICE = 'AUTH SERVICE';

export interface IAuthService {
  register(signupUserDto: SignupUserDto): Promise<any>;

  authenticate(loginUserDto: LoginUserDto): Promise<TokenDto>;

  validateUser(username: string, pass: string): Promise<any>;

  findOne(id: string): Promise<any>;
}

export interface JwtPayload {
  email: string;
}

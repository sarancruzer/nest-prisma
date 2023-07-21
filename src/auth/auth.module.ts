import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AUTH_SERVICE } from './interface/auth.interface';
import { JwtStrategy } from './auth-strategy/jwt.strategy';
import { JwtPayloadService } from 'src/shared/services/jwt-payload.service';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '30m' },
    }),
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    JwtPayloadService,
  ],
})
export class AuthModule {}

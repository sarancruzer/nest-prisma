import { Module } from '@nestjs/common';
import { JwtPayloadService } from './services/jwt-payload.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JwtService, JwtPayloadService],
  exports: [JwtPayloadService],
})
export class SharedModule {}

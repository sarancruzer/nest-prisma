import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonService } from 'src/shared/services/common.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, CommonService, PrismaService],
})
export class UsersModule {}

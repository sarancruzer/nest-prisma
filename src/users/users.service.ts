import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/shared/services/common.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Post, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma : PrismaService,
    private commonService: CommonService,
  ) {}

  async getallUsers(): Promise<User[]> {
    const allUsers = await this.prisma.user.findMany({
      include: {
        posts: {
          include: {
            comments: true,
          },
        },
      },
    });
    return allUsers;
  }
  async getAllPosts(): Promise<Post[]> {
    const allPosts = await this.prisma.post.findMany({
      include: {
        comments: true,
      },
    });
    return allPosts;
  }

}

import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { User, Post as PostModel } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get('user')
  getAllUsers(): Promise<User[]> {
    return this.usersService.getallUsers();
  }

  @Get('posts')
  getAllPosts(): Promise<PostModel[]> {
    return this.usersService.getAllPosts();
  }
}

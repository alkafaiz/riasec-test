import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { User as UserModel } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.user({
      id: Number(req.user.userId),
    });
    return new UserEntity(user);
  }

  @Post('/signup')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.userService.createUser(userData);
    return new UserEntity(newUser);
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { User as UserModel } from '@prisma/client';
import { UsersService } from '../users/users.service';

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
    console.log('req.user', req.user);
    // return req.user;
    const { password, ...user } = await this.userService.user({
      id: Number(req.user.userId),
    });
    return user;
  }

  @Post('/signup')
  async signupUser(
    @Body() userData: { firstName: string; email: string; password: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}

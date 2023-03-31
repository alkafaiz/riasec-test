import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService, JwtAuthGuard, LocalAuthGuard, RefreshAuthGuard } from '@riasec-test/auth';
import { UsersService, UserEntity, CreateUserDto } from '@riasec-test/users';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req, @Response() res) {
    const token = await this.authService.login(req.user);
    this.authService.storeTokenInCookie(res, token);
    res.status(200).send({ message: 'ok' });
    return;
  }

  @UseGuards(RefreshAuthGuard)
  @Get('/auth/refresh')
  async refresh(@Request() req, @Response() res) {
    const token = await this.authService.refreshToken(req.user);
    this.authService.storeTokenInCookie(res, token);
    res.status(200).send({ message: 'ok' });
    return;
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

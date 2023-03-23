import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ email: username });

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    // handle wrong username or password
    throw new UnauthorizedException({
      message: 'Wrong username or password',
      statusCode: 401,
    });
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utils/encryption';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ email: username });

    const correctPassword = user && await comparePassword(pass, user.password)

    if (correctPassword) {
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

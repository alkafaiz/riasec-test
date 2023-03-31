import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { compareHash, hash } from '../utils/encryption';
import { jwtConstants } from './constants';
import { AuthTokenDto } from './dto/auth-token.dto';
import { JwtParsedPayload } from './dto/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ email: username });

    const correctPassword = user && (await compareHash(pass, user.password));

    if (correctPassword) {
      return user;
    }

    // handle wrong username or password
    throw new UnauthorizedException('Wrong username or password');
  }

  async login(user: User) {
    const tokens = await this.getTokens({ userId: user.id, email: user.email });
    const hashedRefreshToken = await hash(tokens.refreshToken);
    await this.usersService.updateUser({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });
    return tokens;
  }

  async getTokens(user: JwtParsedPayload): Promise<AuthTokenDto> {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '60m', // 1 hour
        secret: jwtConstants.secret,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '30d',
        secret: jwtConstants.refresh_secret,
      }),
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);
    await this.usersService.updateUser({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async refreshToken(user: JwtParsedPayload) {
    const { refreshToken } = await this.usersService.user({ id: user.userId });

    const refreshTokenMatches = await compareHash(
      `${user.refreshToken}`,
      refreshToken
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return tokens;
  }

  storeTokenInCookie(res: any, authToken: any) {
    res.cookie('access_token', authToken.accessToken, {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
    });
    res.cookie('refresh_token', authToken.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,  // 30 days
      httpOnly: true,
    });
  }
}

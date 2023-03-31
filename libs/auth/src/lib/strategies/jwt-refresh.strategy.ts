import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { jwtConstants } from '../constants';
import { JwtParsedPayload, JwtPayload } from '../dto/jwt.dto';

@Injectable()
export class RefreshJwtTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshJwtTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refresh_secret,
      passReqToCallback: true,
    });
  }

  async validate(req: RequestType, payload: JwtPayload): Promise<JwtParsedPayload> {
    const refreshToken = req.cookies.refresh_token;
    return { userId: payload.sub, email: payload.email, refreshToken };
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'refresh_token' in req.cookies) {
      return req.cookies.refresh_token;
    }
    return null;
  }
}

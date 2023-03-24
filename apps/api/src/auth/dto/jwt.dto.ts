export class JwtPayload {
  email: string;
  sub: number;
  iat: number;
  exp: number;
}

export class JwtParsedPayload {
  email: string;
  userId: number;
  refreshToken?: string;
}

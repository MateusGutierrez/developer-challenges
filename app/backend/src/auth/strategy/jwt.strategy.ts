import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        JWT_SECRET ??
        (() => {
          throw new Error('JWT_SECRET not set');
        })(),
    });
  }

  validate(payload: { sub: number; email: string; lastname: string; firstname: string }) {
    return payload;
  }
}

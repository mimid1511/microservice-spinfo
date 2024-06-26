import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    console.log("Token or other auth details here", payload);
    // const roles = payload.roles ? (Array.isArray(payload.roles) ? payload.roles : [payload.roles]) : [];
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

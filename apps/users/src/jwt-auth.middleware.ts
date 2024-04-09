import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users/users.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('Authorization header is missing.');

    const token = authHeader.split('Bearer ')[1];
    if (!token) throw new UnauthorizedException('Bearer token is missing.');

    const isValid = await this.usersService.validateToken(token);
    if (!isValid) throw new UnauthorizedException('Token is invalid or expired.');

    next();
  }
}

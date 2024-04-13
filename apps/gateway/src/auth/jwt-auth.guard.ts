import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
// import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private reflector: Reflector) { }

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const isPublic = this.reflector.get<boolean>(
//       IS_PUBLIC_KEY,
//       context.getHandler(),
//     );
//     if (isPublic) {
//       return true;
//     }
//   }
// }

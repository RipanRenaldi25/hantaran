import { NextFunction, Request, Response } from 'express';
import { AuthorizationError } from '../../../../../Domain/Exception/AuthorizationError';
import {
  IConfigService,
  IJwtService,
} from '../../../../../Application/Service';
import { ForbiddenError } from '../../../../../Domain/Exception/ForbiddenError';
import { ClientError } from '../../../../../Domain/Exception/ClientError';

export class AuthMiddleware {
  private jwtService: IJwtService;
  private configService: IConfigService;
  private static instance: AuthMiddleware | null = null;
  private constructor(jwtService: IJwtService, configService: IConfigService) {
    this.jwtService = jwtService;
    this.configService = configService;
  }

  static getInstance(jwtService: IJwtService, configService: IConfigService) {
    if (AuthMiddleware.instance) {
      return AuthMiddleware.instance;
    }
    return new AuthMiddleware(jwtService, configService);
  }

  applyWithRole(roles: ('admin' | 'user')[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.headers.authorization) {
          throw new AuthorizationError('User is unauthorized');
        }
        const [, token] = req.headers.authorization.split(' ');
        const payload: { id: string; email: string; role: 'admin' | 'user' } =
          this.jwtService.verifyToken(
            token,
            this.configService.get('SECRET_ACCESS_TOKEN')
          );
        if (!roles.includes(payload.role)) {
          throw new ForbiddenError('User cannot access this resource');
        }
        (req as any)['user'] = payload;
        next();
      } catch (err: any) {
        if (err instanceof ClientError) {
          res.status(err.statusCode).json({
            status: 'Fail',
            message: `${err.message}`,
          });
        } else {
          res.status(401).json({
            status: 'Fail',
            message: `Server Error: ${err.message}`,
          });
        }
      }
    };
  }
}

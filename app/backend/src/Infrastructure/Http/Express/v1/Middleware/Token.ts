import { NextFunction, Request, Response } from 'express';
import {
  IConfigService,
  IJwtService,
} from '../../../../../Application/Service';

interface ITokenPayload {
  userId: string;
  email: string;
}

export const tokenMiddleware =
  (jwtService: IJwtService, configService: IConfigService) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== 'string')
        throw new Error('Token is required');
      const [bearer, jwtToken] = token.split(' ');
      const payload: ITokenPayload = jwtService.verifyToken(
        jwtToken,
        configService.get('SECRET_EMAIL_TOKEN') as string,
      );
      (req as any).user = {
        userId: payload.userId,
        email: payload.email,
      };
      next();
    } catch (err) {
      res.status(401).json({
        status: 'fail',
        message: 'Token is invalid or expired',
      });
    }
  };

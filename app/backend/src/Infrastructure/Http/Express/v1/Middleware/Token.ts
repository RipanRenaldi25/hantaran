import { NextFunction, Request, Response } from 'express';
import { IJwtService } from '../../../../../Application/Service';

interface ITokenPayload {
  userId: string;
  email: string;
}

export const tokenMiddleware =
  (jwtService: IJwtService) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== 'string')
        throw new Error('Token is required');
      const [bearer, jwtToken] = token.split(' ');
      const payload: ITokenPayload = jwtService.verifyToken(
        jwtToken,
        process.env.SECRET_ACCESS_TOKEN as string,
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

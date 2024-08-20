import {
  IConfigService,
  IJwtOption,
  IJwtService,
} from '../../Application/Service';
import * as jwt from 'jsonwebtoken';

export class JwtService implements IJwtService {
  private readonly jwtModule: typeof jwt;
  constructor(jwtModule: typeof jwt, configService: IConfigService) {
    this.jwtModule = jwtModule;
  }
  generateToken(
    payload: any,
    secretTokenKey: string,
    options?: IJwtOption
  ): string {
    return this.jwtModule.sign(payload, secretTokenKey, options);
  }
  verifyToken<T>(jwtToken: string, secretTokenKey: string): T {
    return this.jwtModule.verify(jwtToken, secretTokenKey) as T;
  }
}

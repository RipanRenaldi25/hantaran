export interface IJwtOption {
  expiresIn: number;
}

export interface IJwtService {
  generateToken(
    payload: any,
    secretTokenKey: string,
    options?: IJwtOption
  ): string;
  verifyToken<T>(jwtToken: string, secretTokenKey: string): T;
}

export interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  verified: boolean;
}

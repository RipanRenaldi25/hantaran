import { IPasswordHashService } from '../../Application/Service';
import bcrypt from 'bcryptjs';

export class PasswordHashService implements IPasswordHashService {
  private readonly bcryptModule: typeof bcrypt;
  constructor(bcryptModule: typeof bcrypt) {
    this.bcryptModule = bcryptModule;
  }
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return this.bcryptModule.compareSync(password, hashedPassword);
  }
  async hash(password: string): Promise<string> {
    return this.bcryptModule.hashSync(password, 10);
  }
}

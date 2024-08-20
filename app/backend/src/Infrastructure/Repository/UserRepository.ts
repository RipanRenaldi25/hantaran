import { Pool } from 'mysql2/promise';
import { User, UserId } from '../../Domain/Entity/User';
import { IUserRepository } from '../../Domain/Repository/IUserRepository';
import { mapDateToDB } from '../Helper/Util';

export class UserRepository implements IUserRepository {
  private readonly dbConnection: Pool;
  constructor(dbConnection: any) {
    this.dbConnection = dbConnection;
  }
  async create(user: User): Promise<UserId> {
    const query =
      'INSERT INTO users (id, username, email, password, role, is_verified, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result, fields] = await this.dbConnection.query(query, [
      user.getId().toString(),
      user.getUsername(),
      user.getEmail(),
      user.getPassword(),
      user.getRole().getId().toString(),
      user.getIsVerified(),
      mapDateToDB(new Date().toISOString()),
    ]);
    console.log({ result });
    return new UserId(user.getId().toString());
  }
}

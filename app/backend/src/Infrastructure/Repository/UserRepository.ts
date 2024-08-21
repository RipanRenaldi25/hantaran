import { Pool, createPool } from 'mysql2/promise';
import { User, UserId } from '../../Domain/Entity/User';
import { mapDateToDB } from '../Helper/Util';
import { IUserRepository } from '../../Domain/Repository/IUserRepository';
import { any } from 'joi';
import { NotFoundError } from '../../Domain/Exception/NotFoundError';
import { Role, RoleId } from '../../Domain/Entity/Role';
import { RoleType } from '../../Domain/ValueObject/RoleType';

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
    return new UserId(user.getId().toString());
  }

  async updateUserByEmail(email: string, user: User): Promise<void> {
    const query = `UPDATE users SET username = ?, email = ?, password = ?, role = ?, is_verified = ?, updated_at = ? WHERE email = ?`;
    const [result, fields] = await this.dbConnection.query(query, [
      user.getUsername(),
      user.getEmail(),
      user.getPassword(),
      user.getRole().getId().toString(),
      user.getIsVerified(),
      mapDateToDB(new Date().toISOString()),
      email,
    ]);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = ?`;

    const [result, fields]: [result: any[], fields: any] =
      await this.dbConnection.query(query, [email]);
    if (!result.length) {
      return null;
    }

    return new User(
      new UserId(result[0].id),
      result[0].username,
      result[0].email,
      result[0].password,
      new Role(
        new RoleId(result[0].role),
        result[0].role === '1' ? new RoleType('admin') : new RoleType('user')
      ),
      result[0].is_verified,
      result[0].created_at
    );
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE username = ?`;

    const [result, fields]: [result: any[], fields: any] =
      await this.dbConnection.query(query, [username]);
    if (!result.length) {
      return null;
    }

    return new User(
      new UserId(result[0].id),
      result[0].username,
      result[0].email,
      result[0].password,
      result[0].role,
      result[0].is_verified,
      result[0].created_at
    );
  }

  async checkAvailableEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return true;
    }
    return false;
  }
  async checkAvailableUsername(username: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);
    if (!user) {
      return true;
    }
    return false;
  }
  async deleteUserByEmail(email: string): Promise<void> {
    return;
  }

  async getUserByUniqueIdentity(uniqueIdentity: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE username=? OR email=?';
    const [result, fields]: [result: any[], fields: any] =
      await this.dbConnection.query(sql, [uniqueIdentity, uniqueIdentity]);
    if (!result.length) {
      return null;
    }
    return new User(
      new UserId(result[0].id),
      result[0].username,
      result[0].email,
      result[0].password,
      new Role(
        result[0].role,
        new RoleType(result[0].role === '1' ? 'admin' : 'user')
      ),
      result[0].is_verified,
      result[0].created_at
    );
  }

  async changeUserPassword(user: User): Promise<void> {
    const query = `UPDATE users SET password = ?, updated_at = ? WHERE id = ?`;
    const [result, fields] = await this.dbConnection.query(query, [
      user.getPassword(),
      mapDateToDB(new Date().toISOString()),
      user.getId().toString(),
    ]);
  }
  async getUserById(id: UserId): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE id = ?';

      const [result, fields]: [result: any[], fields: any] =
        await this.dbConnection.query(query, [id.toString()]);
      return new User(
        id,
        result[0].username,
        result[0].email,
        result[0].password,
        new Role(
          new RoleId(result[0].role),
          new RoleType(result[0].role === '1' ? 'admin' : 'user')
        )
      );
    } catch (err) {
      return null;
    }
  }
}

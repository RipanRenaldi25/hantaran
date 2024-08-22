import { Pool } from 'mysql2/promise';
import { Profile, ProfileId, UserId } from '../../Domain/Entity';
import { IProfileRepository } from '../../Domain/Repository/IProfileRepository';

export class ProfileRepository implements IProfileRepository {
  private readonly dbConnection: Pool;
  constructor(dbConnection: Pool) {
    this.dbConnection = dbConnection;
  }
  async create(profile: Profile): Promise<ProfileId> {
    const sql = `INSERT INTO profiles (id, user_id, full_name, phone_number, avatar, address_id ) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result]: [any[], any[]] = await this.dbConnection.query(sql, [
      profile.getId().toString(),
      profile.getUserId().toString(),
      profile.getFullName(),
      profile.getPhoneNumber(),
      profile.getAvatar(),
      profile.getAddress().getId().toString(),
    ]);

    return profile.getId();
  }

  async getProfileByUserId(userId: UserId): Promise<Profile | null> {
    try {
      const sql = `SELECT * FROM profiles WHERE user_id = ?`;
      const [result]: [any[], any[]] = await this.dbConnection.query(sql, [
        userId.toString(),
      ]);

      return new Profile(
        new ProfileId(result[0].id),
        new UserId(result[0].user_id),
        result[0].full_name,
        result[0].phone_number,
        result[0].avatar,
        result[0].address_id
      );
    } catch (err) {
      return null;
    }
  }

  async runQuery(sql: string, params?: any[]): Promise<void> {
    await this.dbConnection.query(sql, params);
  }
}

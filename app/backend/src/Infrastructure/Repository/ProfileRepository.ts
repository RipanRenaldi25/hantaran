import { Pool } from 'mysql2/promise';
import { Address, Profile, ProfileId, UserId } from '../../Domain/Entity';
import { IProfileRepository } from '../../Domain/Repository/IProfileRepository';
import { IAddressRepository } from '../../Domain/Repository/IAddressRepository';
import { NotFoundError } from '../../Domain/Exception/NotFoundError';

export class ProfileRepository implements IProfileRepository {
  private readonly dbConnection: Pool;
  private readonly addressRepository: IAddressRepository;
  constructor(dbConnection: Pool, addressRepository: IAddressRepository) {
    this.dbConnection = dbConnection;
    this.addressRepository = addressRepository;
  }
  async create(profile: Profile): Promise<ProfileId> {
    const sql = `INSERT INTO profiles (id, user_id, full_name, phone_number, avatar, address_id ) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result]: [any[], any[]] = await this.dbConnection.query(sql, [
      profile.getId().toString(),
      profile.getUserId().toString(),
      profile.getFullName(),
      profile.getPhoneNumber(),
      profile.getAvatar(),
      profile.getAddress()!.getId().toString(),
    ]);

    return profile.getId();
  }

  async getProfileByUserId(userId: UserId): Promise<Profile | null> {
    try {
      const sql = `SELECT * FROM profiles WHERE user_id = ?`;
      const [result]: [any[], any[]] = await this.dbConnection.query(sql, [
        userId.toString(),
      ]);
      const address = await this.addressRepository.getAddressById(
        result[0].address_id
      );
      if (!address) {
        throw new NotFoundError('Address not found');
      }

      return new Profile(
        new ProfileId(result[0].id),
        new UserId(result[0].user_id),
        result[0].full_name,
        result[0].phone_number,
        address,
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

  async updateProfileByUser(profile: Profile): Promise<Profile> {
    const sql = `UPDATE profiles SET full_name = ?, phone_number = ?, avatar = ?, address_id = ? WHERE id = ?`;
    console.log({ profile });
    const [result]: [any[], any[]] = await this.dbConnection.query(sql, [
      profile.getFullName(),
      profile.getPhoneNumber(),
      profile.getAvatar(),
      profile.getAddress()!.getId().toString(),
      profile.getId().toString(),
    ]);
    return profile;
  }
}

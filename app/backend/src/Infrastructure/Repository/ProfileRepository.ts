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

  async editProfileByUserId(
    userId: UserId,
    profile: Partial<{
      user_id: string;
      full_name: string;
      phone_number: string;
      avatar: string;
      created_at: string;
      updated_at: string;
    }>,
    address: Partial<{
      city: string;
      address: string;
      postal_code: string;
      street: string;
      details: string;
    }>
  ): Promise<
    Partial<{
      user_id: string;
      full_name: string;
      phone_number: string;
      avatar: string;
      created_at: string;
      updated_at: string;
      city: string;
      postal_code: string;
      street: string;
      details: string;
    }>
  > {
    try {
      const profileFieldToUpdate: string[] = [];
      const profileValueToUpdate: any[] = [];
      const addressFieldToUpdate: string[] = [];
      const addressValueToUpdate: any[] = [];

      Object.keys(profile).forEach((key) => {
        if (!!(profile as any)[key]) {
          profileFieldToUpdate.push(`${key} = ?`);
          profileValueToUpdate.push((profile as any)[key]);
        }
      });
      Object.keys(address).forEach((key) => {
        if (!!(address as any)[key]) {
          addressFieldToUpdate.push(`${key} = ?`);
          addressValueToUpdate.push((address as any)[key]);
        }
      });

      console.log({
        profileFieldToUpdate,
        profileValueToUpdate,
        addressFieldToUpdate,
        addressValueToUpdate,
      });

      await this.dbConnection.query('START TRANSACTION');

      if (profileValueToUpdate.length) {
        const updateProfileQuery = `UPDATE profiles SET ${profileFieldToUpdate.join(
          ','
        )} WHERE user_id = ?`;
        await this.dbConnection.query(updateProfileQuery, [
          ...profileValueToUpdate,
          userId.toString(),
        ]);
      }
      if (addressValueToUpdate.length) {
        const [[row]]: [any[], any[]] = await this.dbConnection.query(
          `SELECT * FROM profiles WHERE user_id = ?`,
          [userId.toString()]
        );
        const updateAddressQuery = `UPDATE addresses SET ${addressFieldToUpdate.join(
          ','
        )} WHERE id = ?`;
        await this.dbConnection.query(updateAddressQuery, [
          ...addressValueToUpdate,
          row.address_id,
        ]);
      }

      const selectProfileAndAddressQuery = `SELECT profiles.id as profile_id, profiles.user_id, profiles.full_name, profiles.phone_number, profiles.avatar, profiles.address_id as address_id, addresses.city, addresses.postal_code, addresses.street, addresses.details, profiles.created_at, profiles.updated_at FROM profiles LEFT JOIN addresses ON profiles.address_id = addresses.id WHERE profiles.user_id = ?`;
      const [resultsValue]: [any[], any[]] = await this.dbConnection.query(
        selectProfileAndAddressQuery,
        [userId.toString()]
      );

      const [rowValue] = resultsValue;
      await this.dbConnection.query('COMMIT');
      return rowValue;
    } catch (err: any) {
      await this.dbConnection.query('ROLLBACK');
      console.log({ err });
      throw new Error(err.message);
    }
  }
}

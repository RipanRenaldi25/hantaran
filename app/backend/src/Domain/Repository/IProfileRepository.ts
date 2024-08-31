import { Profile, ProfileId, UserId } from '../Entity';

export interface IProfileRepository {
  create(profile: Profile): Promise<ProfileId>;
  getProfileByUserId(userId: UserId): Promise<Profile | null>;
  runQuery(sql: string, params?: any[]): Promise<void>;
  updateProfileByUser(profile: Profile): Promise<Profile>;
  editProfileByUserId(
    userId: UserId,
    profile: Partial<{
      user_id: string;
      full_name: string;
      phone_number: string;
      avatar: string;
    }>,
    address: Partial<{
      city: string;
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
  >;
}

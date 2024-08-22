import { Profile, ProfileId, UserId } from '../Entity';

export interface IProfileRepository {
  create(profile: Profile): Promise<ProfileId>;
  getProfileByUserId(userId: UserId): Promise<Profile | null>;
  runQuery(sql: string, params?: any[]): Promise<void>;
}

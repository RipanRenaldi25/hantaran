import { UserId } from '../../../Domain/Entity';
import { IProfileRepository } from '../../../Domain/Repository/IProfileRepository';

export class EditProfileUsecase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(
    userId: string,
    payload: Partial<{
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
  ) {
    const updatedProfile = await this.profileRepository.editProfileByUserId(
      new UserId(userId),
      {
        avatar: payload.avatar,
        full_name: payload.full_name,
        phone_number: payload.phone_number,
        user_id: userId,
      },
      {
        city: payload.city,
        details: payload.details,
        postal_code: payload.postal_code,
        street: payload.street,
      }
    );
    return updatedProfile;
  }
}

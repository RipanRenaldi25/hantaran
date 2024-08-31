import { UserId } from '../../../Domain/Entity';
import { IProfileRepository } from '../../../Domain/Repository/IProfileRepository';

export class EditProfileUsecase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(
    userId: string,
    payload: Partial<{
      fullName: string;
      phoneNumber: string;
      avatar: string;
    }>
  ) {
    const updatedProfile = await this.profileRepository.editProfileByUserId(
      new UserId(userId),
      payload
    );
  }
}

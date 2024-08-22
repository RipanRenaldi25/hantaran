import { Profile, ProfileId, UserId } from '../../../Domain/Entity';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IProfileRepository } from '../../../Domain/Repository/IProfileRepository';

export class UpdateProfileUsecase {
  private readonly profileRepository: IProfileRepository;
  constructor(profileRepository: IProfileRepository) {
    this.profileRepository = profileRepository;
  }

  async execute(payload: {
    userId: string;
    fullName: string;
    phoneNumber: string;
    avatar?: string;
  }) {
    const profile = await this.profileRepository.getProfileByUserId(
      new UserId(payload.userId)
    );
    if (!profile) {
      throw new NotFoundError('User doesnt have profile yet');
    }
    profile.setFullname(payload.fullName);
    profile.setPhoneNumber(payload.phoneNumber);
    profile.setAvatar(payload.avatar || profile.getAvatar());
    const updatedProfile = await this.profileRepository.updateProfileByUser(
      profile
    );
    return {
      id: updatedProfile.getId().toString,
      userId: updatedProfile.getUserId().toString,
      fullName: updatedProfile.getFullName(),
      phoneNumber: updatedProfile.getPhoneNumber(),
      avatar: updatedProfile.getAvatar(),
    };
  }
}

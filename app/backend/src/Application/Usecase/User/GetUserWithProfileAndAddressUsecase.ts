import { UserId } from '../../../Domain/Entity';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';

export class GetUserWithProfileAndAddressUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string) {
    const idUser = new UserId(userId);
    const userWithProfileAndAddress =
      await this.userRepository.getUserWithProfileAndAddress(idUser);

    return {
      id: userId,
      username: userWithProfileAndAddress?.username,
      full_name: userWithProfileAndAddress?.fullName,
      email: userWithProfileAndAddress?.email,
      phone_number: userWithProfileAndAddress?.phoneNumber,
      city: userWithProfileAndAddress?.city,
      postal_code: userWithProfileAndAddress?.postalCode,
      street: userWithProfileAndAddress?.street,
      details: userWithProfileAndAddress?.details,
      avatar: userWithProfileAndAddress?.avatar,
    };
  }
}

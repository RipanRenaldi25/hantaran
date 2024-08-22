import {
  Address,
  AddressId,
  Profile,
  ProfileId,
  UserId,
} from '../../../Domain/Entity';
import { InvariantError } from '../../../Domain/Exception/InvariantError';
import { IAddressRepository } from '../../../Domain/Repository/IAddressRepository';
import { IProfileRepository } from '../../../Domain/Repository/IProfileRepository';
import { PostalCode } from '../../../Domain/ValueObject/PostalCode';

export class CreateProfileUsecase {
  private readonly profileRepository: IProfileRepository;
  private readonly addressRepository: IAddressRepository;
  private readonly idGenerator: () => string;
  constructor(
    profileRepository: IProfileRepository,
    idGenerator: () => string,
    addressRepository: IAddressRepository
  ) {
    this.profileRepository = profileRepository;
    this.idGenerator = idGenerator;
    this.addressRepository = addressRepository;
  }
  async execute(payload: {
    userId: string;
    fullName: string;
    phoneNumber: string;
    address: {
      city: string;
      postalCode: string;
      street: string;
      details?: string;
    };
    avatar?: string;
  }) {
    try {
      const existingProfile = await this.profileRepository.getProfileByUserId(
        new UserId(payload.userId)
      );
      if (!!existingProfile) {
        throw new InvariantError('User already has profile');
      }
      await this.profileRepository.runQuery('START TRANSACTION');
      const addressToCreate = new Address(
        new AddressId(this.idGenerator()),
        payload.address.city,
        new PostalCode(payload.address.postalCode),
        payload.address.street,
        payload.address.details
      );
      const createdAddressId = await this.addressRepository.create(
        addressToCreate
      );
      const createdUserAddress = await this.addressRepository.getAddressById(
        createdAddressId
      );
      if (!createdUserAddress) {
        throw new InvariantError('Address not created');
      }
      const profile = new Profile(
        new ProfileId(this.idGenerator()),
        new UserId(payload.userId),
        payload.fullName,
        payload.phoneNumber,
        createdUserAddress,
        payload.avatar || ''
      );

      await this.profileRepository.create(profile);
      await this.profileRepository.runQuery('COMMIT');
      return {
        id: profile.getId().toString(),
        userId: profile.getUserId().toString(),
        fullName: profile.getFullName(),
        phoneNumber: profile.getPhoneNumber(),
        address: profile.getAddress().getCity(),
      };
    } catch (err: any) {
      await this.profileRepository.runQuery('ROLLBACK');
      throw new InvariantError(err.message);
    }
  }
}

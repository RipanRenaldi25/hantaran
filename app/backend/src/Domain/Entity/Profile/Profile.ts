import { InvariantError } from '../../Exception/InvariantError';
import { Address } from '../Address/Address';
import { UserId } from '../User';
import { ProfileId } from './ProfileId';

export class Profile {
  private id: ProfileId;
  private readonly userId: UserId;
  private fullName: string;
  private phoneNumber: string;
  private address?: Address;
  private readonly createdAt: string;
  private avatar: string;
  private updatedAt: string;
  constructor(
    id: ProfileId,
    userId: UserId,
    fullName: string,
    phoneNumber: string,
    address: Address,
    avatar?: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    if (!fullName.length) {
      throw new InvariantError('Full name cannot be empty');
    }
    if (!phoneNumber.length) {
      throw new InvariantError('Phone number cannot be empty');
    }
    if (!address) {
      throw new InvariantError('Address cannot be empty');
    }

    if (!id) {
      throw new InvariantError('Profile id cannot be empty');
    }

    if (!userId) {
      throw new InvariantError('User cannot be empty');
    }

    this.id = id;
    this.userId = userId;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || new Date().toISOString();
    this.avatar = avatar || '';
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getFullName() {
    return this.fullName;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getAddress() {
    return this.address;
  }

  setFullname(fullName: string) {
    this.fullName = fullName;
  }

  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  setAddress(address: Address) {
    this.address = address;
  }

  getAvatar() {
    return this.avatar;
  }

  setAvatar(avatar: string) {
    this.avatar = avatar;
  }
}

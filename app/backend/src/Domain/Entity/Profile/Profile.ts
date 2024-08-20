import { InvariantError } from '../../Exception/InvariantError';
import { Address } from '../Address/Address';
import { User } from '../User/User';
import { ProfileId } from './ProfileId';

export class Profile {
  private id: ProfileId;
  private readonly user: User;
  private fullName: string;
  private phoneNumber: string;
  private address: Address;
  private readonly createdAt: string;
  private updatedAt: string;
  constructor(
    id: ProfileId,
    user: User,
    fullName: string,
    phoneNumber: string,
    address: Address,
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

    if (!user) {
      throw new InvariantError('User cannot be empty');
    }

    this.id = id;
    this.user = user;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  getId() {
    return this.id;
  }

  getUser() {
    return this.user;
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
}

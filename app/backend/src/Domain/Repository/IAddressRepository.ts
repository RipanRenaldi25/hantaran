import { Address, AddressId } from '../Entity';

export interface IAddressRepository {
  create(address: Address): Promise<AddressId>;
  getAddressById(addressId: AddressId): Promise<Address | null>;
}

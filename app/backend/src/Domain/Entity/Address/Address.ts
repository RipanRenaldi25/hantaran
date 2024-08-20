import { InvariantError } from '../../Exception/InvariantError';
import { AddressId } from './AddressId';

export class Address {
  private id: AddressId;
  private city: string;
  private postalCode: string;
  private street: string;
  private details: string;
  constructor(
    id: AddressId,
    city: string,
    postalCode: string,
    street: string,
    details?: string
  ) {
    if (!city.length) {
      throw new InvariantError('City cannot be empty');
    }
    if (!postalCode.length) {
      throw new InvariantError('Postal code cannot be empty');
    }
    if (postalCode.length !== 5) {
      throw new InvariantError('Postal code must be 5 digit');
    }
    if (!street.length) {
      throw new InvariantError('Street cannot be empty');
    }
    this.id = id;
    this.city = city;
    this.postalCode = postalCode;
    this.street = street;
    this.details = details || '';
  }

  getCity() {
    return this.city;
  }
  getPostalCode() {
    return this.postalCode;
  }
  getStreet() {
    return this.street;
  }
  getDetail() {
    return this.details;
  }
  setCity(city: string) {
    this.city = city;
  }
  setPostalCode(postalCode: string) {
    this.postalCode = postalCode;
  }
  setStreet(street: string) {
    this.street = street;
  }
  setDetail(details: string) {
    this.details = details;
  }
  getId() {
    return this.id;
  }
}

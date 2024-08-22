import { InvariantError } from '../../Exception/InvariantError';
import { PostalCode } from '../../ValueObject/PostalCode';
import { AddressId } from './AddressId';

export class Address {
  private id: AddressId;
  private city: string;
  private postalCode: PostalCode;
  private street: string;
  private details: string;

  constructor(
    id: AddressId,
    city: string,
    postalCode: PostalCode,
    street: string,
    details?: string
  ) {
    if (!city.length) {
      throw new InvariantError('City cannot be empty');
    }
    if (!street.length) {
      throw new InvariantError('Street cannot be empty');
    }
    this.id = id;
    this.city = city.toLowerCase();
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
  setPostalCode(postalCode: PostalCode) {
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

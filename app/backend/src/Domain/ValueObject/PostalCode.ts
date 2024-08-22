import { InvariantError } from '../Exception/InvariantError';

export class PostalCode {
  private readonly postalCode: string;

  constructor(postalCode: string) {
    if (!postalCode.length) {
      throw new InvariantError('Postal code cannot be empty');
    }
    if (postalCode.length !== 5) {
      throw new InvariantError('Postal code must be 5 characters long');
    }
    this.postalCode = postalCode;
  }

  toString() {
    return this.postalCode;
  }
}

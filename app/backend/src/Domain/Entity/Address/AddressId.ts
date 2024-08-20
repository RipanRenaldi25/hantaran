import { InvariantError } from '../../Exception/InvariantError';

export class AddressId {
  private readonly id: string;
  constructor(id: string) {
    if (!id) {
      throw new InvariantError('Address Id cannot be empty');
    }
    this.id = id;
  }

  toString() {
    return this.id;
  }
}

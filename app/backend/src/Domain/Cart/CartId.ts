import { InvariantError } from '../Exception/InvariantError';

export class CartId {
  private readonly id: string;
  constructor(id: string) {
    if (!id) {
      throw new InvariantError('Cart id cannot be empty');
    }
    this.id = id;
  }

  toString() {
    return this.id;
  }
}

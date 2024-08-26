import { InvariantError } from '../../Exception/InvariantError';

export class OrderId {
  private readonly id: string;
  constructor(id: string) {
    if (!id) {
      throw new InvariantError('Order id cannot empty');
    }
    this.id = id;
  }

  toString() {
    return this.id;
  }
}

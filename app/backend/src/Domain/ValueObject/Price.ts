import { InvariantError } from '../Exception/InvariantError';

export class Price {
  private value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new InvariantError('Price cannot be negative');
    }
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

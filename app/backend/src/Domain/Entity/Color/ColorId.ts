import { InvariantError } from '../../Exception/InvariantError';

export class ColorId {
  private readonly id: string;

  constructor(id: string) {
    if (!id.length) {
      throw new InvariantError('Color Id cannot be empty');
    }
    this.id = id;
  }

  toString() {
    return this.id;
  }
}

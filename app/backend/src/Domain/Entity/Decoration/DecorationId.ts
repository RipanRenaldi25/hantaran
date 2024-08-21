import { InvariantError } from '../../Exception/InvariantError';

export class DecorationId {
  private readonly id: string;
  constructor(id: string) {
    if (!id.length) {
      throw new InvariantError('Decoration Id cannot be empty');
    }
    this.id = id;
  }

  toString() {
    return this.id;
  }
}

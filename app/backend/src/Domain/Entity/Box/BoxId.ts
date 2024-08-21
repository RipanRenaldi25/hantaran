import { InvariantError } from '../../Exception/InvariantError';

export class BoxId {
  private readonly boxId: string;
  constructor(id: string) {
    if (!id.length) {
      throw new InvariantError('Box Id cannot be empty');
    }
    this.boxId = id;
  }

  toString() {
    return this.boxId;
  }
}

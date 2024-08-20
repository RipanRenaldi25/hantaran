import { InvariantError } from '../../Exception/InvariantError';

export class RoleId {
  private readonly id: string;

  constructor(id: string) {
    if (!id.length) {
      throw new InvariantError('Role id cannot be empty');
    }
    this.id = id;
  }

  toString() {
    return this.id;
  }
}

import { InvariantError } from '../../Exception/InvariantError';

export class UserId {
  constructor(private readonly id: string) {
    if (!this.id) {
      throw new InvariantError('User id cannot be empty');
    }
  }

  toString() {
    return this.id;
  }
}

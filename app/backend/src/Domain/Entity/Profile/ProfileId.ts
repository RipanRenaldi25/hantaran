import { InvariantError } from '../../Exception/InvariantError';

export class ProfileId {
  private readonly id: string;
  constructor(id: string) {
    if (!id.length) {
      throw new InvariantError('Profile id cannot be empty');
    }
    this.id = id;
  }
}

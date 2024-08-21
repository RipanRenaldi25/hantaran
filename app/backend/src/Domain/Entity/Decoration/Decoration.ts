import { InvariantError } from '../../Exception/InvariantError';
import { DecorationId } from './DecorationId';

export class Decoration {
  private readonly id: DecorationId;
  private name: string;

  constructor(id: DecorationId, name: string) {
    if (!name.length) {
      throw new InvariantError('Decoration name cannot be empty');
    }
    this.id = id;
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  setName(name: string) {
    this.name = name;
  }
}

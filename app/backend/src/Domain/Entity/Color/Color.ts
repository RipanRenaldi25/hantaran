import { InvariantError } from '../../Exception/InvariantError';
import { ColorId } from './ColorId';

export class Color {
  private readonly id: ColorId;
  private name: string;
  constructor(id: ColorId, name: string) {
    if (!name.length) {
      throw new InvariantError('Color name cannot be empty');
    }
    this.id = id;
    this.name = name.toLowerCase();
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

import { InvariantError } from '../../Exception/InvariantError';
import { RoleType } from '../../ValueObject/RoleType';
import { RoleId } from './RoleId';

export class Role {
  private id: RoleId;
  private roleName: RoleType;

  constructor(id: RoleId, roleName: RoleType) {
    if (!id.toString().length) {
      throw new InvariantError('Role id cannot be empty');
    }
    this.roleName = roleName;
    this.id = id;
  }
  getId() {
    return this.id;
  }

  getName() {
    return this.roleName;
  }
}

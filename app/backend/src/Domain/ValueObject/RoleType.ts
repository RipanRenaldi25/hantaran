import { InvariantError } from '../Exception/InvariantError';

export class RoleType {
  private readonly role: 'admin' | 'user';
  constructor(roleName: 'admin' | 'user') {
    if (!roleName.length) {
      throw new InvariantError('Role roleName cannot be empty');
    }
    if (roleName !== 'admin' && roleName !== 'user') {
      throw new InvariantError('Role roleName must be admin or user');
    }
    this.role = roleName;
  }

  getRole() {
    return this.role;
  }
}

import { InvariantError } from '../../Exception/InvariantError';
import { Role } from '../Role/Role';
import { UserId } from './UserId';

export class User {
  private id: UserId;
  private username: string;
  private email: string;
  private password: string;
  private role: Role;
  private readonly isVerified: boolean;
  private readonly createdAt: string = new Date().toISOString();
  private updatedAt: string = new Date().toISOString();

  constructor(
    id: UserId,
    username: string,
    email: string,
    password: string,
    role: Role,
    isVerified: boolean = false,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.username = username;
    this.email = email;
    this.id = id;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || new Date().toISOString();
    this.isVerified = isVerified;
    this._validatePayload();
  }

  setIsVerified(isVerified: boolean) {
    this.setIsVerified(isVerified);
  }

  mapToDB() {
    return {
      username: this.username,
      email: this.email,
      id: this.id.toString(),
      password: this.password,
      role: this.role,
      is_verified: this.isVerified,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  private _validatePayload() {
    this.validateUsername();
    this.validatePassword();
  }

  private validatePassword() {
    const result =
      /[a-z]/.test(this.password) &&
      /[A-Z]/.test(this.password) &&
      /[0-9]/.test(this.password) &&
      /[!@#$%^&*]/.test(this.password) &&
      this.password.length >= 8 &&
      /^[^\s]/.test(this.password) &&
      /[^\s]$/.test(this.password);
    if (!result) {
      throw new InvariantError('Invalid password format');
    }
  }

  private validateUsername() {
    const result =
      /[a-zA-Z0-9]/.test(this.username) &&
      /^[^0-9\s!@#$%^&*]/.test(this.username) &&
      /[^\s]$/.test(this.username) &&
      this.username.length > 4;
    if (!result) {
      throw new InvariantError('Invalid username format');
    }
  }

  setPassword(password: string) {
    this.password = password;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this.role;
  }

  getIsVerified() {
    return this.isVerified;
  }

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }
}

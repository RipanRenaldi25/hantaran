import { Pool } from 'mysql2/promise';
import { Address, AddressId } from '../../Domain/Entity';
import { IAddressRepository } from '../../Domain/Repository/IAddressRepository';
import { InvariantError } from '../../Domain/Exception/InvariantError';
import { PostalCode } from '../../Domain/ValueObject/PostalCode';

export class AddressRepository implements IAddressRepository {
  private readonly dbConnection: Pool;
  constructor(dbConnection: Pool) {
    this.dbConnection = dbConnection;
  }
  async create(address: Address): Promise<AddressId> {
    const sql =
      'INSERT INTO addresses(id, city, postal_code, street, details) VALUES(?, ?, ?, ?, ?)';
    const values = [
      address.getId().toString(),
      address.getCity(),
      address.getPostalCode().toString(),
      address.getStreet(),
      address.getDetail(),
    ];
    await this.dbConnection.query(sql, values);
    return address.getId();
  }
  async getAddressById(addressId: AddressId): Promise<Address | null> {
    try {
      const sql = `SELECT * FROM addresses WHERE id = ?`;
      const [result]: [any[], any[]] = await this.dbConnection.query(sql, [
        addressId.toString(),
      ]);
      const address = new Address(
        addressId,
        result[0].city,
        new PostalCode(result[0].postal_code),
        result[0].street,
        result[0].details || null
      );
      return address;
    } catch (err) {
      return null;
    }
  }
}

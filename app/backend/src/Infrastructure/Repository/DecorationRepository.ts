import { Pool } from 'mysql2/promise';
import { Decoration, DecorationId } from '../../Domain/Entity';
import { IDecorationRepository } from '../../Domain/Repository/IDecorationRepository';

export class DecorationRepository implements IDecorationRepository {
  private readonly dbConnection: Pool;
  constructor(dbConnection: Pool) {
    this.dbConnection = dbConnection;
  }
  async getDecorationByName(name: string): Promise<Decoration | null> {
    const query = 'SELECT * FROM decorations WHERE name = ?';
    const [result]: [any[], any[]] = await this.dbConnection.query(query, [
      name,
    ]);
    if (!result.length) {
      return null;
    }
    return new Decoration(new DecorationId(result[0].id), result[0].name);
  }
  async create(decoration: Decoration): Promise<Decoration> {
    const query = 'INSERT INTO decorations (id, name) VALUES (?, ?)';
    const [results]: [any[], any[]] = await this.dbConnection.query(query, [
      decoration.getId().toString(),
      decoration.getName(),
    ]);
    return decoration;
  }
}

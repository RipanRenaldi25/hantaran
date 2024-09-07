import { Pool } from 'mysql2/promise';
import { Decoration, DecorationId } from '../../Domain/Entity';
import {
  IDecoration,
  IDecorationRepository,
} from '../../Domain/Repository/IDecorationRepository';

export class DecorationRepository implements IDecorationRepository {
  private readonly dbConnection: Pool;
  constructor(dbConnection: Pool) {
    this.dbConnection = dbConnection;
  }
  async getDecorationByName(name: string): Promise<Decoration | null> {
    try {
      const query = 'SELECT * FROM decorations WHERE name = ?';
      const [result]: [any[], any[]] = await this.dbConnection.query(query, [
        name,
      ]);
      return new Decoration(new DecorationId(result[0].id), result[0].name);
    } catch (err) {
      return null;
    }
  }
  async create(decoration: Decoration): Promise<Decoration> {
    const query = 'INSERT INTO decorations (id, name) VALUES (?, ?)';
    const [results]: [any[], any[]] = await this.dbConnection.query(query, [
      decoration.getId().toString(),
      decoration.getName(),
    ]);
    return decoration;
  }

  async getDecorationById(id: DecorationId): Promise<Decoration | null> {
    try {
      const query = 'SELECT * FROM decorations WHERE id = ?';
      const [result]: [any[], any[]] = await this.dbConnection.query(query, [
        id.toString(),
      ]);
      return new Decoration(new DecorationId(result[0].id), result[0].name);
    } catch (err) {
      return null;
    }
  }

  async getDecorations(): Promise<IDecoration[]> {
    try {
      const getDecorationQuery = `SELECT * FROM decorations`;
      const [result]: [any[], any[]] = await this.dbConnection.query(
        getDecorationQuery
      );

      return result;
    } catch (err) {
      return [];
    }
  }
}

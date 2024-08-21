import { Pool } from 'mysql2/promise';
import { Box, BoxId } from '../../Domain/Entity';
import { IBoxRepository } from '../../Domain/Repository/IBoxRepository';

export class BoxRepository implements IBoxRepository {
  private readonly dbConnection: Pool;
  constructor(dbConnection: Pool) {
    this.dbConnection = dbConnection;
  }
  async createBox(box: Box): Promise<BoxId> {
    const query = 'INSERT INTO boxes (id, name, image_url) VALUES (?, ?, ?)';
    await this.dbConnection.query(query, [
      box.getId().toString(),
      box.getName(),
      box.getBoxImageUrl(),
    ]);
    return box.getId();
  }
  async deleteBox(id: BoxId): Promise<void> {
    const query = 'DELETE FROM boxes WHERE id = ?';
    await this.dbConnection.query(query, [id.toString()]);
  }
  async getBoxById(id: BoxId): Promise<Box | null> {
    const query = 'SELECT * FROM boxes WHERE id = ?';
    const [rows, fields]: [rows: any[], fields: any[]] =
      await this.dbConnection.query(query, [id.toString()]);
    return new Box(
      new BoxId(rows[0].id),
      rows[0].name,
      [],
      [],
      rows[0].image_url
    );
  }
  async updateBox(id: BoxId, box: Box): Promise<Box> {
    return {} as any;
  }
}

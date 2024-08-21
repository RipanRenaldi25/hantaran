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
  async deleteBox(id: BoxId): Promise<void> {}
  async getBoxById(id: BoxId): Promise<Box | null> {
    return null;
  }
  async updateBox(id: BoxId, box: Box): Promise<Box> {
    return {} as any;
  }
}

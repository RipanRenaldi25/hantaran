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
    const query = 'UPDATE boxes SET name = ?, image_url = ? WHERE id = ?';
    await this.dbConnection.query(query, [
      box.getName(),
      box.getBoxImageUrl(),
      id.toString(),
    ]);
    return box;
  }

  async getMappedBoxes(page: number, size: number) {
    const query = `SELECT * FROM boxes LIMIT ? OFFSET ?`;
    const [resultBox, fieldsBox]: [rows: any[], fields: any[]] =
      await this.dbConnection.query(query, [size, size * (page - 1)]);
    const boxes = resultBox.map(
      (box) => new Box(new BoxId(box.id), box.name, [], [], box.image_url)
    );

    return boxes;
  }

  async getBoxes(
    page?: number,
    size?: number
  ): Promise<{
    total: number;
    boxes: Box[];
    page: number;
  }> {
    const boxes = await this.getMappedBoxes(page || 1, size || 10);
    const countBoxesQuery = `SELECT COUNT(id) as total FROM boxes`;

    const [resultTotalBox, fields]: [rows: any[], fields: any[]] =
      await this.dbConnection.query(countBoxesQuery);
    const total = resultTotalBox[0].total;
    return {
      boxes,
      total,
      page: page || 1,
    };
  }
}

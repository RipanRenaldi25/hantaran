import { Pool } from 'mysql2/promise';
import {
  Box,
  BoxId,
  Color,
  ColorId,
  Decoration,
  DecorationId,
} from '../../Domain/Entity';
import { IBoxRepository } from '../../Domain/Repository/IBoxRepository';
import { InvariantError } from '../../Domain/Exception/InvariantError';
import { IColorRepository } from '../../Domain/Repository/IColorRepository';
import { IDecorationRepository } from '../../Domain/Repository/IDecorationRepository';
import { Price } from '../../Domain/ValueObject/Price';

export class BoxRepository implements IBoxRepository {
  private readonly dbConnection: Pool;
  private readonly colorRepository: IColorRepository;
  private readonly decorationRepository: IDecorationRepository;
  constructor(
    dbConnection: Pool,
    colorRepository: IColorRepository,
    decorationRepository: IDecorationRepository
  ) {
    this.dbConnection = dbConnection;
    this.colorRepository = colorRepository;
    this.decorationRepository = decorationRepository;
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
    try {
      const query = 'SELECT * FROM boxes WHERE id = ?';
      const [rows, fields]: [rows: any[], fields: any[]] =
        await this.dbConnection.query(query, [id.toString()]);
      return new Box(new BoxId(rows[0].id), rows[0].name, rows[0].image_url);
    } catch (err) {
      return null;
    }
  }
  async updateBox(id: BoxId, box: Box): Promise<Box> {
    const query =
      'UPDATE boxes SET name = ?, image_url = ?, price = ? WHERE id = ?';
    await this.dbConnection.query(query, [
      box.getName(),
      box.getBoxImageUrl(),
      box.getPrice().getValue(),
      id.toString(),
    ]);
    return box;
  }

  async getMappedBoxes(page: number, size: number) {
    const query = `SELECT * FROM boxes LIMIT ? OFFSET ?`;
    const [resultBox, fieldsBox]: [rows: any[], fields: any[]] =
      await this.dbConnection.query(query, [size, size * (page - 1)]);
    return resultBox;
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

  async getListDecorationByName(names: string[]): Promise<Decoration[]> {
    const query = `SELECT * FROM decorations WHERE name IN (?)`;

    const [decorations]: [rows: any[], fields: any[]] =
      await this.dbConnection.query(query, [names]);
    return decorations.map(
      (decoration) =>
        new Decoration(new DecorationId(decoration.id), decoration.name)
    );
  }

  async getListColorByName(names: string[]): Promise<Color[]> {
    const query = `SELECT * FROM colors WHERE name IN (?)`;
    const [colors]: [rows: any[], fields: any[]] =
      await this.dbConnection.query(query, [names]);
    return colors.map((color) => new Color(new ColorId(color.id), color.name));
  }

  async connectBoxWithDecorationAndColor(box: Box): Promise<Box | undefined> {
    try {
      await this.dbConnection.query('START TRANSACTION');
      const connectBoxWithDecorationQuery =
        'INSERT INTO box_decorations (box_id, decoration_id) VALUES (?, ?)';
      const connectBoxWithColorQuery =
        'INSERT INTO box_colors (box_id, color_id) VALUES (?, ?)';
      await this.dbConnection.query(connectBoxWithColorQuery, [
        box.getId().toString(),
        box.getcolor()?.getId().toString(),
      ]);
      await this.dbConnection.query(connectBoxWithDecorationQuery, [
        box.getId().toString(),
        box.getdecoration()?.getId().toString(),
      ]);
      await this.dbConnection.query('COMMIT');
      return box;
    } catch (err: any) {
      console.log(`ROLLBACK ${err.message}`);
      await this.dbConnection.query('ROLLBACK');
      throw new Error(err.message);
    }
  }
}

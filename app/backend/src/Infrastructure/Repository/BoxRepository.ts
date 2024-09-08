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
import { IColorRepository } from '../../Domain/Repository/IColorRepository';
import { IDecorationRepository } from '../../Domain/Repository/IDecorationRepository';

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
    const query =
      'INSERT INTO boxes (id, name, image_url, price) VALUES (?, ?, ?, ?)';
    await this.dbConnection.query(query, [
      box.getId().toString(),
      box.getName(),
      box.getBoxImageUrl(),
      box.getPrice().getValue(),
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
  async connectBoxWithDecoration(box: Box): Promise<Box> {
    try {
      await this.dbConnection.query('START TRANSACTION');
      const connectBoxWithDecorationQuery =
        'INSERT INTO box_decorations (box_id, decoration_id) VALUES (?, ?)';
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

  async connectBoxWithColorQuery(box: Box): Promise<Box> {
    try {
      await this.dbConnection.query('START TRANSACTION');
      const connectBoxWithColorQuery =
        'INSERT INTO box_colors (box_id, color_id) VALUES (?, ?)';
      await this.dbConnection.query(connectBoxWithColorQuery, [
        box.getId().toString(),
        box.getcolor()?.getId().toString(),
      ]);
      await this.dbConnection.query('COMMIT');
      return box;
    } catch (err: any) {
      console.log(`ROLLBACK ${err.message}`);
      await this.dbConnection.query('ROLLBACK');
      throw new Error(err.message);
    }
  }

  async getBoxesWithColorAndDecoration(): Promise<
    {
      id: string;
      box_name: string;
      box_image_url: string;
      color_name: string;
      color_id: string;
      decoration_name: string;
      decoration_id: string;
      price: number;
    }[]
  > {
    const query = `SELECT boxes.id as id, boxes.name as box_name, boxes.price, boxes.image_url as box_image_url, decorations.name as decoration_name, colors.name as color_name, colors.id as color_id, decorations.id as decoration_id FROM boxes JOIN box_colors ON boxes.id=box_colors.box_id JOIN colors ON box_colors.color_id = colors.id JOIN box_decorations ON boxes.id = box_decorations.box_id JOIN decorations ON box_decorations.decoration_id = decorations.id`;
    const [resultBox]: [rows: any[], fields: any[]] =
      await this.dbConnection.query(query);

    return resultBox;
  }

  async unconnectBoxWithDecorationId(
    id: BoxId,
    decorationId: DecorationId
  ): Promise<void> {
    const query =
      'DELETE FROM box_decorations WHERE box_id = ? AND decoration_id = ?';
    const [result]: [any[], any[]] = await this.dbConnection.query(query, [
      id.toString(),
      decorationId.toString(),
    ]);
  }

  async unconnectBoxWithColorId(id: BoxId, colorId: ColorId): Promise<void> {
    const query = 'DELETE FROM box_colors WHERE box_id = ? AND color_id = ?';
    const [result]: [any[], any[]] = await this.dbConnection.query(query, [
      id.toString(),
      colorId.toString(),
    ]);
  }
}

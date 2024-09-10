import { Pool } from 'mysql2/promise';
import {
  IColor,
  IColorRepository,
} from '../../Domain/Repository/IColorRepository';
import { BoxId, Color, ColorId } from '../../Domain/Entity';

export class ColorRepository implements IColorRepository {
  private readonly dbConnection: Pool;
  constructor(dbConnection: Pool) {
    this.dbConnection = dbConnection;
  }

  async create(color: Color): Promise<Color> {
    const query = 'INSERT INTO colors (id, name) VALUES (?, ?)';
    const [results]: [any[], any[]] = await this.dbConnection.query(query, [
      color.getId().toString(),
      color.getName(),
    ]);
    return color;
  }
  async getColorByName(name: string): Promise<Color | null> {
    try {
      const query = `SELECT * FROM colors WHERE name = ?`;
      const [result]: [any[], any[]] = await this.dbConnection.query(query, [
        name,
      ]);
      if (!result.length) {
        return null;
      }
      return new Color(new ColorId(result[0].id), result[0].name);
    } catch (err: any) {
      return null;
    }
  }
  async getColorById(id: ColorId): Promise<Color | null> {
    try {
      const query = `SELECT * FROM colors WHERE id = ?`;
      const [result]: [any[], any[]] = await this.dbConnection.query(query, [
        id.toString(),
      ]);
      if (!result.length) {
        return null;
      }
      return new Color(new ColorId(result[0].id), result[0].name);
    } catch (err: any) {
      return null;
    }
  }

  async getColors(): Promise<IColor[]> {
    try {
      const getColorsQuery = `SELECT * FROM colors`;
      const [result]: [any[], any[]] = await this.dbConnection.query(
        getColorsQuery
      );
      return result;
    } catch (err) {
      return [];
    }
  }

  async getColorBelongToBox(
    boxId: BoxId
  ): Promise<{ box_id: string; color_id: string; color_name: string }[]> {
    try {
      const query = `SELECT box_colors.box_id, box_colors.color_id, colors.name FROM box_colors JOIN colors ON box_colors.color_id = colors.id WHERE box_colors.box_id = ?`;
      const [result]: [any[], any[]] = await this.dbConnection.query(query, [
        boxId.toString(),
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

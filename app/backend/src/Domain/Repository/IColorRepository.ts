import { Color, ColorId } from '../Entity';

export interface IColorRepository {
  create(color: Color): Promise<Color>;
  getColorByName(name: string): Promise<Color | null>;
}

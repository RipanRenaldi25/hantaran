import { BoxId, Color, ColorId } from '../Entity';

export interface IColorRepository {
  create(color: Color): Promise<Color>;
  getColorByName(name: string): Promise<Color | null>;
  getColorById(id: ColorId): Promise<Color | null>;
  // createOrConnect(color: Color, boxId: BoxId): Promise<Color>
}

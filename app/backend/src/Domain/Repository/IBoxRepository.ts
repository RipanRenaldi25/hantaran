import { Box, BoxId, Color, Decoration } from '../Entity';

export interface IBoxRepository {
  getBoxById(id: BoxId): Promise<Box | null>;
  createBox(box: Box): Promise<BoxId>;
  deleteBox(id: BoxId): Promise<void>;
  updateBox(id: BoxId, box: Box): Promise<Box>;
  getBoxes(
    page?: number,
    size?: number
  ): Promise<{
    total: number;
    boxes: Box[];
    page: number;
  }>;
  // getBoxByDecoration(decoration: string): Promise<Box[]>;
  // getBoxByColor(color: string): Promise<Box[]>;
}

import { Box, BoxId } from '../Entity';

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
}

import { Box, BoxId, ColorId, DecorationId } from '../Entity';

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
  connectBoxWithDecorationAndColor(box: Box): Promise<Box | undefined>;
  connectBoxWithDecoration(box: Box): Promise<Box>;
  connectBoxWithColorQuery(box: Box): Promise<Box>;
  getBoxesWithColorAndDecoration(): Promise<
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
  >;
  unconnectBoxWithDecorationId(
    id: BoxId,
    decorationId: DecorationId
  ): Promise<void>;

  unconnectBoxWithColorId(id: BoxId, colorId: ColorId): Promise<void>;
}

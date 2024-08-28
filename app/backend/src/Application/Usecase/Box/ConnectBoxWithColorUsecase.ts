import { Box, BoxId, ColorId } from '../../../Domain/Entity';
import { InvariantError } from '../../../Domain/Exception/InvariantError';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';
import { IColorRepository } from '../../../Domain/Repository/IColorRepository';

export class ConnectBoxWithColorUsecase {
  private readonly boxRepository: IBoxRepository;
  private readonly colorRepository: IColorRepository;
  constructor(
    boxRepository: IBoxRepository,
    colorRepository: IColorRepository
  ) {
    this.boxRepository = boxRepository;
    this.colorRepository = colorRepository;
  }

  async execute(payload: { colorId: string; boxId: string }) {
    const { colorId, boxId } = payload;
    const existingBox = await this.boxRepository.getBoxById(new BoxId(boxId));
    if (!existingBox) {
      throw new NotFoundError('Box not found');
    }
    const existingColor = await this.colorRepository.getColorById(
      new ColorId(colorId)
    );
    if (!existingColor) {
      throw new NotFoundError('Color not found');
    }
    const newBoxWithDecorationAndColor = new Box(
      existingBox.getId(),
      existingBox.getName(),
      existingBox.getBoxImageUrl(),
      existingBox.getPrice(),
      undefined,
      existingColor
    );

    const boxCreated = await this.boxRepository.connectBoxWithColorQuery(
      newBoxWithDecorationAndColor
    );
    if (!boxCreated) {
      throw new InvariantError('Cannot connect box with decoration and color');
    }
    return {
      id: boxCreated.getId().toString(),
      name: boxCreated.getName(),
      decoration: boxCreated.getdecoration()?.getName(),
      color: boxCreated.getcolor()?.getName(),
    };
  }
}

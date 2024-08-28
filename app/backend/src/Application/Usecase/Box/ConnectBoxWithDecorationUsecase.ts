import {
  Box,
  BoxId,
  Color,
  ColorId,
  Decoration,
  DecorationId,
} from '../../../Domain/Entity';
import { InvariantError } from '../../../Domain/Exception/InvariantError';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';
import { IDecorationRepository } from '../../../Domain/Repository/IDecorationRepository';

export class ConnectBoxWithDecorationUsecase {
  private readonly boxRepository: IBoxRepository;
  private readonly decorationRepository: IDecorationRepository;
  constructor(
    boxRepository: IBoxRepository,
    decorationRepository: IDecorationRepository
  ) {
    this.boxRepository = boxRepository;
    this.decorationRepository = decorationRepository;
  }

  async execute(payload: { boxId: string; decorationId: string }) {
    const { boxId, decorationId } = payload;
    const existingBox = await this.boxRepository.getBoxById(new BoxId(boxId));
    if (!existingBox) {
      throw new NotFoundError('Box not found');
    }
    const existingDecoration =
      await this.decorationRepository.getDecorationById(
        new DecorationId(decorationId)
      );
    if (!existingDecoration) {
      throw new NotFoundError('Decoration not found');
    }
    const newBoxWithDecorationAndColor = new Box(
      existingBox.getId(),
      existingBox.getName(),
      existingBox.getBoxImageUrl(),
      existingBox.getPrice(),
      existingDecoration
    );

    const boxCreated = await this.boxRepository.connectBoxWithDecoration(
      newBoxWithDecorationAndColor
    );
    if (!boxCreated) {
      throw new InvariantError('Cannot connect box with decoration and color');
    }
    return {
      id: boxCreated.getId().toString(),
      name: boxCreated.getName(),
      decoration: boxCreated.getdecoration()?.getName(),
    };
  }
}

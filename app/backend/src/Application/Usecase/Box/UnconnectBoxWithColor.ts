import { BoxId, ColorId } from '../../../Domain/Entity';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';

export class UnconnectBoxWithColorUsecase {
  constructor(private readonly boxRepository: IBoxRepository) {}

  async execute(boxId: string, colorId: string) {
    await this.boxRepository.unconnectBoxWithColorId(
      new BoxId(boxId),
      new ColorId(colorId)
    );
  }
}

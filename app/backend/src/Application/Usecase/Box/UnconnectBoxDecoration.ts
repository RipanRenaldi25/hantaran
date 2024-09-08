import { BoxId, DecorationId } from '../../../Domain/Entity';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';

export class UnconnectBoxDecorationUsecase {
  constructor(private readonly boxRepository: IBoxRepository) {}

  async execute(boxId: string, decorationId: string) {
    await this.boxRepository.unconnectBoxWithDecorationId(
      new BoxId(boxId),
      new DecorationId(decorationId)
    );
  }
}

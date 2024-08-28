import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';

export class getBoxesWithColorAndDecorationUsecase {
  constructor(private readonly boxRepository: IBoxRepository) {}

  async execute() {
    const boxes = await this.boxRepository.getBoxesWithColorAndDecoration();

    return boxes;
  }
}

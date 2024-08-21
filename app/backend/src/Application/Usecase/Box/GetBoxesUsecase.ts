import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';

export class GetBoxesUsecase {
  private readonly boxRepository: IBoxRepository;
  constructor(boxRepository: IBoxRepository) {
    this.boxRepository = boxRepository;
  }
  async execute(page: number, size: number) {
    return await this.boxRepository.getBoxes(page, size);
  }
}

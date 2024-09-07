import { IColorRepository } from '../../../Domain/Repository/IColorRepository';

export class GetColorUsecase {
  constructor(private readonly colorRepository: IColorRepository) {}

  async execute() {
    const colors = await this.colorRepository.getColors();

    return colors;
  }
}

import { IDecorationRepository } from '../../../Domain/Repository/IDecorationRepository';

export class GetDecorationUsecase {
  constructor(private readonly decorationRepository: IDecorationRepository) {}

  async execute() {
    const decorations = await this.decorationRepository.getDecorations();

    return decorations;
  }
}

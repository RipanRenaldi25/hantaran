import { BoxId } from '../../../Domain/Entity';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';

export class GetBoxByIdUsecase {
  private readonly boxRepository: IBoxRepository;
  constructor(boxRepository: IBoxRepository) {
    this.boxRepository = boxRepository;
  }

  async execute(boxId: string) {
    const box = await this.boxRepository.getBoxById(new BoxId(boxId));
    if (!box) {
      throw new NotFoundError('Box not found');
    }

    return box;
  }
}

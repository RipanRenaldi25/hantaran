import { Box, BoxId } from '../../../Domain/Entity';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';

export class UpdateBoxUsecase {
  private readonly boxRepository: IBoxRepository;

  constructor(boxRepository: IBoxRepository) {
    this.boxRepository = boxRepository;
  }

  async execute(payload: any) {
    const box = await this.boxRepository.getBoxById(new BoxId(payload.boxId));
    if (!box) {
      throw new NotFoundError('Box not found');
    }
    box.setName(payload.name);
    box.setBoxImageUrl(payload.imageUrl);
    await this.boxRepository.updateBox(box.getId(), box);
    return box;
  }
}

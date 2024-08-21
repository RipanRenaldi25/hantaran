import { Box, BoxId } from '../../../Domain/Entity';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';
import { Price } from '../../../Domain/ValueObject/Price';

export class UpdateBoxUsecase {
  private readonly boxRepository: IBoxRepository;

  constructor(boxRepository: IBoxRepository) {
    this.boxRepository = boxRepository;
  }

  async execute(payload: {
    name: string;
    imageUrl: string;
    boxId: string;
    price: number;
  }) {
    const box = await this.boxRepository.getBoxById(new BoxId(payload.boxId));
    if (!box) {
      throw new NotFoundError('Box not found');
    }
    box.setName(payload.name);
    if (payload.imageUrl) {
      box.setBoxImageUrl(payload.imageUrl);
    }
    box.setPrice(new Price(payload.price));
    await this.boxRepository.updateBox(box.getId(), box);
    return box;
  }
}

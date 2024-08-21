import { Box, BoxId } from '../../../Domain/Entity';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';
import { Price } from '../../../Domain/ValueObject/Price';

export class CreateBoxUsecase {
  private readonly boxRepository: IBoxRepository;
  private readonly idGenerator: () => string;
  constructor(boxRepository: IBoxRepository, idGenerator: () => string) {
    this.boxRepository = boxRepository;
    this.idGenerator = idGenerator;
  }

  async execute(payload: { name: string; imageUrl: string; price: number }) {
    const { name, imageUrl } = payload;
    const boxId = new BoxId(this.idGenerator());
    const boxPrice = new Price(payload.price);
    const box = new Box(boxId, name, imageUrl, boxPrice);
    const boxCreatedId = await this.boxRepository.createBox(box);

    return boxCreatedId;
  }
}

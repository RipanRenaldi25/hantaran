import { Box, BoxId } from '../../../Domain/Entity';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';

export class CreateBoxUsecase {
  private readonly boxRepository: IBoxRepository;
  private readonly idGenerator: () => string;
  constructor(boxRepository: IBoxRepository, idGenerator: () => string) {
    this.boxRepository = boxRepository;
    this.idGenerator = idGenerator;
  }

  async execute(payload: any) {
    const { name, imageUrl } = payload;
    const boxId = new BoxId(this.idGenerator());
    const box = new Box(boxId, name, [], [], imageUrl);
    const boxCreatedId = await this.boxRepository.createBox(box);

    return boxCreatedId;
  }
}

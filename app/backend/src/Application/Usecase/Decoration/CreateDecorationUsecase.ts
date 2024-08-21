import { Decoration, DecorationId } from '../../../Domain/Entity';
import { InvariantError } from '../../../Domain/Exception/InvariantError';
import { IDecorationRepository } from '../../../Domain/Repository/IDecorationRepository';

export class CreateDecorationUsecase {
  private readonly decorationRepository: IDecorationRepository;
  private readonly idGenerator: () => string;
  constructor(
    decorationRepository: IDecorationRepository,
    idGenerator: () => string
  ) {
    this.decorationRepository = decorationRepository;
    this.idGenerator = idGenerator;
  }

  async execute(name: string) {
    const id = new DecorationId(this.idGenerator());
    const isDecorationExists =
      await this.decorationRepository.getDecorationByName(name);
    if (isDecorationExists) {
      throw new InvariantError('Decoration already exists');
    }
    const decoration = new Decoration(id, name);
    const decorationCreated = await this.decorationRepository.create(
      decoration
    );
    return {
      id: decorationCreated.getId().toString(),
      name: decorationCreated.getName(),
    };
  }
}

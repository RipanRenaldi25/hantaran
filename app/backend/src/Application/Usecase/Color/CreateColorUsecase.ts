import { Color, ColorId } from '../../../Domain/Entity';
import { InvariantError } from '../../../Domain/Exception/InvariantError';
import { IColorRepository } from '../../../Domain/Repository/IColorRepository';

export class CreateColorUsecase {
  private readonly colorRepository: IColorRepository;
  private readonly idGenerator: () => string;

  constructor(colorRepository: IColorRepository, idGenerator: () => string) {
    this.colorRepository = colorRepository;
    this.idGenerator = idGenerator;
  }

  async execute(name: string) {
    const isColorExists = await this.colorRepository.getColorByName(
      name.toLowerCase()
    );
    if (isColorExists) {
      throw new InvariantError('Color already exists');
    }
    const colorId = new ColorId(this.idGenerator());
    const color = new Color(colorId, name);
    const colorCreated = await this.colorRepository.create(color);
    return {
      id: colorCreated.getId().toString(),
      name: colorCreated.getName(),
    };
  }
}

import { BoxId } from '../../../Domain/Entity';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';
import { IColorRepository } from '../../../Domain/Repository/IColorRepository';
import { IDecorationRepository } from '../../../Domain/Repository/IDecorationRepository';

export class GetBoxWithColorAndDecorationByBoxIdUsecase {
  constructor(
    private readonly boxRepository: IBoxRepository,
    private readonly colorRepository: IColorRepository,
    private readonly decorationRepository: IDecorationRepository
  ) {}

  async execute(boxId: string) {
    const box = await this.boxRepository.getBoxById(new BoxId(boxId));
    if (!box?.getId().toString()) {
      throw new NotFoundError('Box not found');
    }
    const boxColors = await this.colorRepository.getColorBelongToBox(
      box.getId()
    );
    const boxDecorations =
      await this.decorationRepository.getDecorationBelongToBox(box.getId());
    return {
      boxes: {
        box_name: box.getName(),
        box_id: box.getId().toString(),
        box_image_url: box.getBoxImageUrl(),
        box_price: box.getPrice().getValue(),
      },
      colors: boxColors,
      decorations: boxDecorations,
    };
  }
}

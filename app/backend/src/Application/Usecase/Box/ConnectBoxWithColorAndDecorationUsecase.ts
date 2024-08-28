import { Box, BoxId, ColorId, DecorationId } from '../../../Domain/Entity';
import { InvariantError } from '../../../Domain/Exception/InvariantError';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';
import { IColorRepository } from '../../../Domain/Repository/IColorRepository';
import { IDecorationRepository } from '../../../Domain/Repository/IDecorationRepository';

// not uesd yet because wrong box domain definition
// export class createBoxWithDecorationAndColorUsecase {
//   private readonly boxRepository: IBoxRepository;
//   private readonly idGenerator: () => string;
//   constructor(boxRepository: IBoxRepository, idGenerator: () => string) {
//     this.boxRepository = boxRepository;
//     this.idGenerator = idGenerator;
//   }

//   async execute(payload: {
//     box: { name: string; imageUrl: string };
//     colors: { name: string }[];
//     decorations: { name: string }[];
//   }) {
//     const {
//       box: { name, imageUrl },
//       colors,
//       decorations,
//     } = payload;
//     const boxId = new BoxId(this.idGenerator());
//     const decorationsToCreate = decorations.map(
//       (decoration) =>
//         new Decoration(new DecorationId(this.idGenerator()), decoration.name)
//     );
//     const colorsToCreate = colors.map(
//       (color) => new Color(new ColorId(this.idGenerator()), color.name)
//     );

//     const newBoxWithDecorationAndColor = new Box(
//       boxId,
//       name,
//       decorationsToCreate,
//       colorsToCreate,
//       imageUrl
//     );

//     const colorIds: string[] = [];
//   }
// }

export class ConnectBoxWithDecorationAndColorUsecase {
  private readonly boxRepository: IBoxRepository;
  private readonly colorRepository: IColorRepository;
  private readonly decorationRepository: IDecorationRepository;
  private readonly idGenerator: () => string;
  constructor(
    boxRepository: IBoxRepository,
    idGenerator: () => string,
    colorRepository: IColorRepository,
    decorationRepository: IDecorationRepository
  ) {
    this.boxRepository = boxRepository;
    this.idGenerator = idGenerator;
    this.colorRepository = colorRepository;
    this.decorationRepository = decorationRepository;
  }

  async execute(payload: {
    colorId: string;
    boxId: string;
    decorationId: string;
  }) {
    const { colorId, boxId, decorationId } = payload;
    const existingBox = await this.boxRepository.getBoxById(new BoxId(boxId));
    if (!existingBox) {
      throw new NotFoundError('Box not found');
    }
    const existingColor = await this.colorRepository.getColorById(
      new ColorId(colorId)
    );
    if (!existingColor) {
      throw new NotFoundError('Color not found');
    }
    const existingDecoration =
      await this.decorationRepository.getDecorationById(
        new DecorationId(decorationId)
      );
    if (!existingDecoration) {
      throw new NotFoundError('Decoration not found');
    }
    const newBoxWithDecorationAndColor = new Box(
      existingBox.getId(),
      existingBox.getName(),
      existingBox.getBoxImageUrl(),
      existingBox.getPrice(),
      existingDecoration,
      existingColor
    );

    const boxCreated =
      await this.boxRepository.connectBoxWithDecorationAndColor(
        newBoxWithDecorationAndColor
      );
    if (!boxCreated) {
      throw new InvariantError('Cannot connect box with decoration and color');
    }
    return {
      id: boxCreated.getId().toString(),
      name: boxCreated.getName(),
      decoration: boxCreated.getdecoration()?.getName(),
      color: boxCreated.getcolor()?.getName(),
    };
  }
}

import {
  Box,
  BoxId,
  Color,
  ColorId,
  Decoration,
  DecorationId,
} from '../../../Domain/Entity';
import { IBoxRepository } from '../../../Domain/Repository/IBoxRepository';

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

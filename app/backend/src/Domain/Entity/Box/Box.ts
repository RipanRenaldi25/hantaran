import { Color } from '../Color/Color';
import { Decoration } from '../Decoration/Decoration';
import { BoxId } from './BoxId';

export class Box {
  private id: BoxId;
  private name: string;
  private decorations: Decoration[] = [];
  private colors: Color[] = [];
  private boxImageUrl: string;

  constructor(
    id: BoxId,
    name: string,
    decorations: Decoration[],
    colors: Color[],
    boxImageUrl: string
  ) {
    this.id = id;
    this.decorations = decorations;
    this.colors = colors;
    this.name = name;
    this.boxImageUrl = boxImageUrl;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDecorations() {
    return this.decorations;
  }

  getColors() {
    return this.colors;
  }

  addDecoration(decoration: Decoration) {
    this.decorations.push(decoration);
  }

  addColor(color: Color) {
    this.colors.push(color);
  }

  setName(name: string) {
    this.name = name;
  }

  getBoxImageUrl() {
    return this.boxImageUrl;
  }

  setBoxImageUrl(boxImageUrl: string) {
    this.boxImageUrl = boxImageUrl;
  }
}

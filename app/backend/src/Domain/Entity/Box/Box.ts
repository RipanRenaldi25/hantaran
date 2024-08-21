import { Price } from '../../ValueObject/Price';
import { Color } from '../Color/Color';
import { DecorationId } from '../Decoration';
import { Decoration } from '../Decoration/Decoration';
import { BoxId } from './BoxId';

export class Box {
  private id: BoxId;
  private name: string;
  private decoration?: Decoration;
  private color?: Color;
  private boxImageUrl: string;
  private price: Price;

  constructor(
    id: BoxId,
    name: string,
    boxImageUrl: string,
    price: Price = new Price(0),
    decoration?: Decoration,
    color?: Color
  ) {
    this.id = id;
    this.decoration = decoration;
    this.color = color;
    this.name = name;
    this.boxImageUrl = boxImageUrl;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getdecoration() {
    return this.decoration;
  }

  getcolor() {
    return this.color;
  }

  setDecoration(decoration: Decoration) {
    this.decoration = decoration;
  }

  setColor(color: Color) {
    this.color = color;
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

  getPrice() {
    return this.price;
  }

  setPrice(price: Price) {
    this.price = price;
  }
}

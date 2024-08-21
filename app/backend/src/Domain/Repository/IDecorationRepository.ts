import { Decoration } from '../Entity';

export interface IDecorationRepository {
  create(decoration: Decoration): Promise<Decoration>;
  getDecorationByName(name: string): Promise<Decoration | null>;
}

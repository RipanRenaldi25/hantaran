import { Decoration, DecorationId } from '../Entity';

export interface IDecoration {
  id: string;
  name: string;
}

export interface IDecorationRepository {
  create(decoration: Decoration): Promise<Decoration>;
  getDecorationByName(name: string): Promise<Decoration | null>;
  getDecorationById(id: DecorationId): Promise<Decoration | null>;
  getDecorations(): Promise<IDecoration[]>;
}

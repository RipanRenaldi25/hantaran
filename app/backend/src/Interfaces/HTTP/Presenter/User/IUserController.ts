import { FrameworkInterfaceAdapter } from '../../Adapter/FrameworkInterface';

export interface IUserController {
  getHello(req: any, res: any): void;
}

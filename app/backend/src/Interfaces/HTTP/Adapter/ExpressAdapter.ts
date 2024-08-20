import { FrameworkInterfaceAdapter } from './FrameworkInterface';

export class ExpressAdapter extends FrameworkInterfaceAdapter {
  adapt(handler: any): (request: any, responseWriter: any) => void {
    return async (req, res) => handler(req, res);
  }
}

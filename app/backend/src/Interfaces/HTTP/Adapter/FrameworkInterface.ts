export abstract class FrameworkInterfaceAdapter {
  abstract adapt(handler: any): (request: any, responseWriter: any) => void;
}

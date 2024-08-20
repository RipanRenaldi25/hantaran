export abstract class ClientError extends Error {
  name: string = '';
  statusCode: number = 400;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'Client Error';
    this.statusCode = statusCode;
  }
}

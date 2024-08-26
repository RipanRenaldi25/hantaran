export class PaymentId {
  constructor(private readonly id: string) {}

  toString() {
    return this.id;
  }
}

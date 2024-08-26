import { CartItem } from '../../Cart/CartItem';
import { Price } from '../../ValueObject/Price';
import { OrderId } from '../Order/OrderId';

export type PaymentType = 'bank_transfer' | 'echannel' | 'qris';

export interface ICustomerDetails {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  shipping_address: {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
  };
}

export interface IItemDetails {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IBankTransferOption {
  bank: string;
  va_number: string;
}

export interface ITransactionConfigurations {
  transactionDetails: {
    orderId: string;
    grossAmount: number;
  };
  itemDetails?: Partial<IItemDetails>[];
  customerDetails?: ICustomerDetails;
  bankTransfer?: IBankTransferOption;
  qris?: {
    acquirer: 'gopay' | 'airpay shopee';
  };
  shopeepay?: {
    callbackUrl: string;
  };
  echannel?: {
    billInfo1: string;
    billInfo2: string;
  };

  [key: string]: any;
}

export abstract class AbstractPayment {
  protected paymentType: 'bank_transfer' | 'echannel' | 'qris';
  protected transactionConfiguration: ITransactionConfigurations;
  constructor(amount: Price, orderId: OrderId, paymentType: PaymentType) {
    this.paymentType = paymentType;
    this.transactionConfiguration = {
      transactionDetails: {
        grossAmount: amount.getValue(),
        orderId: orderId.toString(),
      },
    };
  }

  getTransactionConfiguration() {
    return this.transactionConfiguration;
  }

  getPaymentType() {
    return this.paymentType;
  }

  addTransactionConfiguration(options: Partial<ITransactionConfigurations>) {
    this.transactionConfiguration = {
      ...structuredClone(this.transactionConfiguration),
      ...options,
    };
  }

  mapToFetch() {
    const removeUndefinedProps = (obj: { [key: string]: any }): any => {
      return Object.fromEntries(
        Object.entries(obj)
          .filter(([_, v]) => {
            // Hanya sertakan properti jika nilainya tidak undefined, tidak kosong, atau bukan objek kosong
            if (v === undefined) return false; // Menghapus undefined
            if (typeof v === 'object' && !Array.isArray(v)) {
              // Menghapus objek kosong
              return Object.keys(v).length > 0;
            }
            if (Array.isArray(v)) {
              // Menghapus array kosong
              return v.length > 0;
            }
            return true; // Sertakan semua nilai yang valid
          })
          .map(([k, v]) => {
            // Rekursif: Terapkan fungsi untuk setiap objek nested
            if (typeof v === 'object' && !Array.isArray(v)) {
              return [k, removeUndefinedProps(v)];
            }
            return [k, v];
          })
      );
    };

    const transactionDetails = removeUndefinedProps({
      gross_amount:
        this.transactionConfiguration.transactionDetails.grossAmount,
      order_id: this.transactionConfiguration.transactionDetails.orderId,
    });

    const customerDetails = removeUndefinedProps({
      email: this.transactionConfiguration.customerDetails?.email,
      first_name: this.transactionConfiguration.customerDetails?.first_name,
      last_name: this.transactionConfiguration.customerDetails?.last_name,
      phone: this.transactionConfiguration.customerDetails?.phone,
      address: this.transactionConfiguration.customerDetails?.address,
      shipping_address: removeUndefinedProps({
        first_name:
          this.transactionConfiguration.customerDetails?.shipping_address
            ?.first_name,
        last_name:
          this.transactionConfiguration.customerDetails?.shipping_address
            ?.last_name,
        phone:
          this.transactionConfiguration.customerDetails?.shipping_address
            ?.phone,
        address:
          this.transactionConfiguration.customerDetails?.shipping_address
            ?.address,
        city: this.transactionConfiguration.customerDetails?.shipping_address
          ?.city,
        postal_code:
          this.transactionConfiguration.customerDetails?.shipping_address
            ?.postal_code,
      }),
    });

    const itemDetails = this.transactionConfiguration.itemDetails?.map((item) =>
      removeUndefinedProps({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })
    );

    const bankTransfer = removeUndefinedProps({
      bank: this.transactionConfiguration.bankTransfer?.bank,
      va_number: this.transactionConfiguration.bankTransfer?.va_number,
    });

    const qris = removeUndefinedProps({
      acquirer: this.transactionConfiguration.qris?.acquirer,
    });

    const shopeepay = removeUndefinedProps({
      callback_url: this.transactionConfiguration.shopeepay?.callbackUrl,
    });

    const echannel = removeUndefinedProps({
      bill_info1: this.transactionConfiguration.echannel?.billInfo1,
      bill_info2: this.transactionConfiguration.echannel?.billInfo2,
    });

    return removeUndefinedProps({
      transaction_details: transactionDetails,
      customer_details: customerDetails,
      item_details: itemDetails,
      bank_transfer: bankTransfer,
      payment_type: this.paymentType,
      qris: qris,
      shopeepay: shopeepay,
      echannel: echannel,
    });
  }

  updateAmount(amount: Price) {
    this.transactionConfiguration.transactionDetails.grossAmount =
      amount.getValue();
  }
}

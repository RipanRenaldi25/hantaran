import { IBoxes, IOrder } from '@/states/interface';
import axios from 'axios';

export const getOrders = async (): Promise<IOrder[]> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/orders`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    return data;
  } catch (err) {
    return [];
  }
};

// {
//   "orderItems": [{
//     "boxId": "0d48d0a0-5d9a-41ea-9962-b74a046ef73d",
//     "quantity": 10000,
//     "price": 2,
//     "name": "box"
//   },
//   {
//     "boxId": "b097a16c-82c7-404a-a77d-c12d0bc500ee",
//     "quantity": 10,
//     "price": 1000,
//     "name": "box2"
//   },
//   {
//     "boxId": "c7c57261-5b95-4941-bff5-33959f6867d5",
//     "quantity": 5,
//     "price": 5000,
//     "name": "box3"
//   }
//   ],
//   // "paymentMethod": "qris",
//   // "acquirer": "airpay shopee"
//   // "paymentMethod": "bank_transfer",
//   // "bankName": "bni",
//   // "vaNumber": "081280010646"
//   "paymentMethod": "echannel",
//   "billInfo1": "hantaran",
//   "billInfo2": "1000"
// }

export const createOrder = async ({
  orderItems,
  paymentMethod,
  acquirer,
  billInfo1,
  billInfo2,
  bankName,
  vaNumber,
}: {
  orderItems: {
    boxId: string;
    price: number;
    quantity: number;
    name: string;
  }[];
  paymentMethod: string;
  acquirer?: string;
  billInfo1?: string;
  billInfo2?: string;
  bankName?: string;
  vaNumber?: string;
}) => {
  try {
    let methodPayment =
      paymentMethod === 'qris'
        ? 'qris'
        : paymentMethod === 'mandiri'
        ? 'echannel'
        : 'bank_transfer';
    const payload = {
      orderItems,
      paymentMethod: methodPayment,
    };
    if (payload.paymentMethod === 'qris') {
      (payload as any)['acquirer'] = acquirer;
    } else if (payload.paymentMethod === 'bank_transfer') {
      (payload as any)['bankName'] = bankName;
      (payload as any)['vaNumber'] = vaNumber;
    } else if (payload.paymentMethod === 'echannel') {
      (payload as any)['billInfo1'] = billInfo1;
      (payload as any)['billInfo2'] = billInfo2;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/orders`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    return data;
  } catch (err) {
    console.log({ err });
    return null;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    return data;
  } catch (err) {
    return null;
  }
};

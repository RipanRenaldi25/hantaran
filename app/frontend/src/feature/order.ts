import { IOrder } from '@/states/interface';
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

export const createOrder = async ({
  orderItems,
  paymentMethod,
  acquirer,
  billInfo1,
  billInfo2,
  bankName,
  vaNumber,
  weddingDate,
  address,
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
  weddingDate: string;
  address: string;
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
      weddingDate,
      address,
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

export const getOrderWithItems = async (orderId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}/items`,
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

export const getTransactionStatus = async (orderId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}/status`
    );
    return response.data.data;
  } catch (err: any) {
    return null;
  }
};

export const getOrdersOwnedByUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/orders/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    return data;
  } catch (err: any) {
    console.log({ err });
    return null;
  }
};

export const updateOrderManageStatus = async (
  orderId: string,
  manageStatus: 'processed' | 'completed' | 'unprocessed' | 'cancelled'
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}/status`,
      {
        manageStatus,
      },
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

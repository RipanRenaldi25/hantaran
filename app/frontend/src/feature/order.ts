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

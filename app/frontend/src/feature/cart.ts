import axios from 'axios';

export interface ICreateCart {
  items: Item[];
}

export interface Item {
  boxId: string;
  quantity: number;
}

export const createCart = async (cart: ICreateCart) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/carts`,
      cart,
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

export const getCartOwnedByUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/carts/self/`,
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

import { IBoxesResponse } from '@/states/interface';
import axios from 'axios';

export const getBoxes = async (): Promise<IBoxesResponse> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/boxes`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    return data;
  } catch (err) {
    return { boxes: [], page: 0, total: 0 } as IBoxesResponse;
  }
};

export const getBoxesWithColorAndDecoration = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/boxes/colors/decorations/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    console.log(data);
    return data;
  } catch (err) {
    return { boxes: [], page: 0, total: 0 } as IBoxesResponse;
  }
};

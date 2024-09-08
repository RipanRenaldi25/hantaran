import { IBox, IBoxesResponse, IColor, IDecoration } from '@/states/interface';
import axios from 'axios';

export const getBoxes = async (
  page?: number,
  size?: number
): Promise<{
  boxes: IBox[];
  page: number;
  total: number;
}> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/boxes?page=${page || 1}&size=${
        size || 10
      }`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    return data;
  } catch (err) {
    return { boxes: [], page: 0, total: 0 };
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
    return data;
  } catch (err) {
    return { boxes: [], page: 0, total: 0 } as IBoxesResponse;
  }
};

export const getColors = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/colors`,
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

export const getDecorations = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/decorations`,
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

export const createBox = async (boxPayload: {
  name: string;
  price: number;
  image: any;
}): Promise<{ boxId: string }> => {
  console.log({ boxPayload2: boxPayload });
  const formData = new FormData();
  formData.append('name', boxPayload.name);
  formData.append('price', boxPayload.price as any);
  formData.append('image', boxPayload.image);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/boxes`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log({ response });
    const { data }: Awaited<{ data: { boxId: string } }> = response.data;
    return data;
  } catch (err: any) {
    console.log({ message: err });
    throw new Error(err.message);
  }
};

export const connectBoxWithColor = async (colorId: string, boxId: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/boxes/connect/colors`,
      {
        colorId,
        boxId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    return data;
  } catch (err: any) {
    console.log({ err: err.message });
    return null;
  }
};

export const connectBoxWithDecoration = async (
  decorationId: string,
  boxId: string
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/boxes/connect/decorations`,
      {
        decorationId,
        boxId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    return data;
  } catch (err: any) {
    console.log({ err: err.message });
    return null;
  }
};

export const createBoxAndConnectWithDecorationAndColor = async (
  colors: IColor[],
  decorations: IDecoration[],
  boxPayload: {
    name: string;
    price: number;
    image: any;
  }
) => {
  try {
    const { boxId } = await createBox(boxPayload);
    console.log({ boxId });
    await Promise.all([
      ...colors.map((color) => connectBoxWithColor(color.id, boxId)),
      ...decorations.map((decoration) =>
        connectBoxWithDecoration(decoration.id, boxId)
      ),
    ]);
    console.log(`Box ${boxId} connected successfully`);
    return boxId;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
};

export const createColor = async (color: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/colors`,
      {
        name: color,
      },
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

export const createDecoration = async (decoration: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/decorations`,
      {
        name: decoration,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const { data } = response.data;
    return data;
  } catch (err: any) {
    return null;
  }
};

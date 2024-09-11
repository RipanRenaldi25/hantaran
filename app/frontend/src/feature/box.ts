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

export const getBoxById = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/boxes/${id}`,
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

export const getBoxWithColorAndDecorationBelongToBox = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/boxes/${id}/colors/decorations`,
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

const unconnectBoxWithDecoration = async (
  decorationId: string,
  boxId: string
) => {
  try {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/boxes/${boxId}/decorations/${decorationId}`,
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
const unconnectBoxWithColor = async (colorId: string, boxId: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/boxes/${boxId}/colors/${colorId}`,
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

export const updateBox = async (
  colors: IColor[],
  decorations: IDecoration[],
  boxPayload: {
    id: string;
    name: string;
    price: number;
    image: any;
  },
  deletedColors: IColor[] = [],
  deletedDecoration: IDecoration[] = []
) => {
  try {
    const formData = new FormData();
    formData.append('name', boxPayload.name);
    formData.append('price', boxPayload.price as any);
    if (boxPayload.image) {
      formData.append('image', boxPayload.image);
    }
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/boxes/${boxPayload.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log({ colors, decorations });
    if (colors.length > 0) {
      colors.map((color) => connectBoxWithColor(color.id, boxPayload.id));
    }
    if (decorations.length > 0) {
      decorations.map(
        async (decoration) =>
          await connectBoxWithDecoration(decoration.id, boxPayload.id)
      );
    }
    if (deletedColors.length > 0) {
      deletedColors.map(
        async (deletedCol) =>
          await unconnectBoxWithColor(deletedCol.id, boxPayload.id)
      );
    }
    if (deletedDecoration.length > 0) {
      deletedDecoration.map(
        async (deletedDecor) =>
          await unconnectBoxWithDecoration(deletedDecor.id, boxPayload.id)
      );
    }
    const { data } = response.data;
    return data;
  } catch (err: any) {
    console.log({ err });
    return null;
  }
};

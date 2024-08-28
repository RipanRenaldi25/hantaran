import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IBoxes,
  IBoxesResponse,
  IBoxResponseWithColorAndDecoration,
  IMapBoxResponse,
} from './interface';

const initState: IBoxesResponse & {
  boxesWithColorAndDecoration: IMapBoxResponse[];
} = {
  boxes: [],
  total: 0,
  page: 0,
  boxesWithColorAndDecoration: [],
};

export const boxSlice = createSlice({
  initialState: initState,
  name: 'boxSlice',
  reducers: {
    setBoxes: (state, action: PayloadAction<IBoxesResponse>) => {
      state.boxes = action.payload.boxes;
      state.total = action.payload.total;
      state.page = action.payload.page;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setBox: (state, action: PayloadAction<IBoxes>) => {
      state.boxes = [...state.boxes, action.payload];
    },
    setBoxWithColorAndDecoration: (
      state,
      action: PayloadAction<IMapBoxResponse[]>
    ) => {
      const groupedBoxes = action.payload.reduce((acc, box) => {
        const existingBox = acc.find((b) => b.id === box.id);
        if (existingBox) {
          existingBox.colors = existingBox.colors.map((color) => {
            console.log({ color, box });
            if (color.id !== box.color_id) {
              return {
                ...color,
                name: box.color_name,
              };
            }
            return color;
          });
          existingBox.decorations = existingBox.decorations.map((value) => {
            if (value.id === box.decoration_id) {
              return {
                ...value,
                name: box.decoration_name,
              };
            }
            return value;
          });
        } else {
          acc.push({
            id: box.id,
            box_name: box.box_name,
            color_id: box.color_id,
            color_name: box.color_name,
            decoration_id: box.decoration_id,
            decoration_name: box.decoration_name,
            box_image_url: box.box_image_url,
            price: box.price,
            colors: [
              {
                id: box.color_id,
                name: box.color_name,
              },
            ],
            decorations: [
              {
                id: box.decoration_id,
                name: box.decoration_name,
              },
            ],
          });
        }
        return acc;
      }, [] as IMapBoxResponse[]);

      state.boxesWithColorAndDecoration = groupedBoxes;
    },
  },
});

const { setBox, setBoxes, setPage, setTotal, setBoxWithColorAndDecoration } =
  boxSlice.actions;
const boxReducer = boxSlice.reducer;

export {
  boxReducer,
  setBox,
  setBoxes,
  setPage,
  setTotal,
  setBoxWithColorAndDecoration,
};

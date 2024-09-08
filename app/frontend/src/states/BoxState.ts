import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IBox,
  IBoxes,
  IBoxesResponse,
  IBoxResponseWithColorAndDecoration,
  IMapBoxResponse,
} from './interface';
import { Item } from '@radix-ui/react-navigation-menu';
import { ChartNoAxesColumnDecreasing } from 'lucide-react';

const initState: IBoxesResponse & {
  boxesWithColorAndDecoration: IMapBoxResponse[];
  onlyBoxes: IBox[];
  groupedBoxes: { [key: string]: any };
} = {
  boxes: [],
  total: 0,
  page: 0,
  boxesWithColorAndDecoration: [],
  onlyBoxes: [],
  groupedBoxes: {},
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
      const grouped = action.payload.reduce((acc, box) => {
        const existingItem = acc.find((item) => item.id === box.id);
        if (!existingItem) {
          acc.push({
            ...box,
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
        } else {
          const existingColor = existingItem.colors.find(
            (col) => col.id === box.color_id
          );
          const existingDecoration = existingItem.decorations.find(
            (decor) => decor.id === box.decoration_id
          );
          if (!existingDecoration) {
            existingItem.decorations.push({
              id: box.decoration_id,
              name: box.decoration_name,
            });
          }
          if (!existingColor) {
            existingItem.colors.push({
              id: box.color_id,
              name: box.color_name,
            });
          }
        }

        return acc;
      }, [] as IMapBoxResponse[]);

      state.boxesWithColorAndDecoration = grouped;
    },

    setOnlyBoxes(state, action: PayloadAction<IBox[]>) {
      state.onlyBoxes = action.payload;
    },
  },
});

export const {
  setBox,
  setBoxes,
  setPage,
  setTotal,
  setBoxWithColorAndDecoration,
  setOnlyBoxes,
} = boxSlice.actions;
export const boxReducer = boxSlice.reducer;

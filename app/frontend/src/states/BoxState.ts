import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IBox,
  IBoxes,
  IBoxesResponse,
  IBoxResponseWithColorAndDecoration,
  IMapBoxResponse,
} from './interface';
import { Item } from '@radix-ui/react-navigation-menu';

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
      const groupedBoxes = action.payload.reduce((acc, box) => {
        const existingBox = acc.find((b) => b.id === box.id);
        if (existingBox) {
          existingBox.colors = existingBox.colors.map((color) => {
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

      // function groupBy<T>(
      //   array: T[],
      //   groupKey: keyof T, // Key untuk mengelompokkan data
      //   uniqueKey1: keyof T, // Key pertama untuk mendeteksi duplikat
      //   uniqueKey2: keyof T // Key kedua untuk mendeteksi duplikat
      // ): Record<string, T[]> {
      //   return array.reduce((result, item) => {
      //     // Buat kunci untuk grup berdasarkan 'groupKey'
      //     const groupKeyValue = item[groupKey] as unknown as string;

      //     // Buat grup jika belum ada
      //     if (!result[groupKeyValue]) {
      //       result[groupKeyValue] = [];
      //     }

      //     // Cek apakah item sudah ada dalam grup berdasarkan uniqueKey1 dan uniqueKey2
      //     const isDuplicate = result[groupKeyValue].some(
      //       (existingItem) =>
      //         existingItem[uniqueKey1] === item[uniqueKey1] &&
      //         existingItem[uniqueKey2] === item[uniqueKey2]
      //     );

      //     // Tambahkan item hanya jika tidak ada duplikat
      //     if (!isDuplicate) {
      //       result[groupKeyValue].push(item);
      //     }

      //     return result;
      //   }, {} as Record<string, T[]>);
      // }

      // const test = groupBy(action.payload, 'id', 'decoration_id', 'color_id');
      state.boxesWithColorAndDecoration = groupedBoxes;
      // state.groupedBoxes = groupBy(
      //   action.payload,
      //   'id',
      //   'decoration_id',
      //   'color_id'
      // );
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoxes, IBoxesResponse } from './interface';

const initState: IBoxesResponse = {
  boxes: [],
  total: 0,
  page: 0,
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
  },
});

const { setBox, setBoxes, setPage, setTotal } = boxSlice.actions;
const boxReducer = boxSlice.reducer;

export { boxReducer, setBox, setBoxes, setPage, setTotal };

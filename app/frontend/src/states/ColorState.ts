import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColor } from './interface';

type initStateType = {
  colors: IColor[];
};

const initState: initStateType = {
  colors: [],
};

export const colorSlice = createSlice({
  initialState: initState,
  name: 'colorSlice',
  reducers: {
    setAllColors: (state, action: PayloadAction<IColor[]>) => {
      state.colors = action.payload;
    },
    setColor: (state, action: PayloadAction<IColor>) => {
      state.colors = [...state.colors, action.payload];
    },
  },
});

export const { setAllColors, setColor } = colorSlice.actions;
export const colorReducer = colorSlice.reducer;

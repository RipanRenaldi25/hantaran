import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDecoration } from './interface';

type initStateType = {
  decorations: IDecoration[];
};

const initState: initStateType = {
  decorations: [],
};

export const decorationSlice = createSlice({
  initialState: initState,
  name: 'decorationSlice',
  reducers: {
    setAllDecorations: (state, action: PayloadAction<IDecoration[]>) => {
      state.decorations = action.payload;
    },
    setDecoration: (state, action: PayloadAction<IDecoration>) => {
      state.decorations = [...state.decorations, action.payload];
    },
  },
});

export const { setAllDecorations, setDecoration } = decorationSlice.actions;
export const decorationReducer = decorationSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from './interface';

type initStateType = {
  order: IOrder[];
};

const initialState: initStateType = {
  order: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<IOrder[]>) => {
      state.order = action.payload;
    },
  },
});

const {
  actions: { setOrder },
  reducer,
} = orderSlice;

export { setOrder, reducer as orderReducer };

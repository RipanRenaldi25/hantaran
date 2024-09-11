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
    setOrderStatus(
      state,
      action: PayloadAction<{
        id: string;
        status: 'processed' | 'unprocessed' | 'completed' | 'cancelled';
      }>
    ) {
      state.order = state.order.map((order) => ({
        ...order,
        manageStatus:
          order.id === action.payload.id
            ? action.payload.status
            : order.manageStatus,
      }));
    },
  },
});

export const {
  actions: { setOrder, setOrderStatus },
  reducer,
} = orderSlice;

export { reducer as orderReducer };

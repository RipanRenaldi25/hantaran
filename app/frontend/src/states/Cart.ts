import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart, ICartItem, IOwnedCart } from './interface';

type initStateType = {
  carts: ICartItem[];
  ownedCarts: IOwnedCart[];
};

const initState: initStateType = {
  carts: JSON.parse(localStorage.getItem('CARTS')!) || [],
  ownedCarts: [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initState,
  reducers: {
    setCart(state, action: PayloadAction<ICartItem[]>) {
      state.carts = action.payload;
    },
    updateSpecificCart(state, action: PayloadAction<ICartItem>) {
      const index = state.carts.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.color_name === action.payload.color_name &&
          item.decoration_name === action.payload.decoration_name
      );
      if (index !== -1) {
        state.carts[index] = action.payload;
        return;
      }
      state.carts.push(action.payload);
      localStorage.setItem('CARTS', JSON.stringify(state.carts));
    },

    incrementQuantity(
      state,
      action: PayloadAction<{ id: string; color: string; decoration: string }>
    ) {
      const index = state.carts.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.color_name === action.payload.color &&
          item.decoration_name === action.payload.decoration
      );
      console.log({ index });
      if (index !== -1) {
        state.carts[index].quantity += 1;
        localStorage.setItem('CARTS', JSON.stringify(state.carts));
      }
    },
    decrementQuantity(
      state,
      action: PayloadAction<{ id: string; color: string; decoration: string }>
    ) {
      const index = state.carts.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.color_name === action.payload.color &&
          item.decoration_name === action.payload.decoration
      );
      if (index !== -1) {
        state.carts[index].quantity -= 1;
        localStorage.setItem('CARTS', JSON.stringify(state.carts));
      }
    },
    removeSpecificCart(
      state,
      action: PayloadAction<{ id: string; color: string; decoration: string }>
    ) {
      console.log({ payload: action.payload });
      state.carts = state.carts.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.color_name !== action.payload.color ||
          item.decoration_name !== action.payload.decoration
      );
    },

    clearCartState(state) {
      state.carts = [];
      localStorage.setItem('CARTS', JSON.stringify(state.carts));
    },
  },
});

export const {
  actions: {
    setCart,
    updateSpecificCart,
    incrementQuantity,
    decrementQuantity,
    removeSpecificCart,
    clearCartState,
  },
  reducer,
} = cartSlice;

export { reducer as cartReducer };

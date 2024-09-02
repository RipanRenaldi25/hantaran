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
          item.color === action.payload.color &&
          item.decoration === action.payload.decoration
      );
      if (index !== -1) {
        state.carts[index] = action.payload;
        return;
      }
      state.carts.push(action.payload);
    },

    incrementQuantity(
      state,
      action: PayloadAction<{ id: string; color: string; decoration: string }>
    ) {
      const index = state.carts.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.decoration === action.payload.decoration
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
          item.color === action.payload.color &&
          item.decoration === action.payload.decoration
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
      // console.log({ payload: action.payload, cart: state.carts });
      // const index = state.carts.findIndex(
      //   (item) =>
      //     item.id === action.payload.id &&
      //     item.color === action.payload.color &&
      //     item.decoration === action.payload.decoration
      // );

      // if (index !== -1) {
      //   state.carts.splice(index, 1);
      // }

      state.carts = state.carts.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.color !== action.payload.color ||
          item.decoration !== action.payload.decoration
      );

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
  },
  reducer,
} = cartSlice;

export { reducer as cartReducer };

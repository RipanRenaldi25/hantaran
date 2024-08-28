import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart, IOwnedCart } from './interface';

type initStateType = {
  carts: ICart[];
  ownedCarts: IOwnedCart[];
};

const initState: initStateType = {
  carts: [],
  ownedCarts: [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initState,
  reducers: {
    setCart(state, action: PayloadAction<ICart[]>) {
      state.carts = action.payload;
    },
    updateSpecificCart(state, action: PayloadAction<ICart>) {
      const index = state.carts.findIndex(
        (cart) => cart.id === action.payload.id
      );
      if (index !== -1) {
        state.carts[index] = action.payload;
        return;
      }
      state.carts.push(action.payload);
    },
    removeSpecificCart(state, action: PayloadAction<{ id: string }>) {
      state.carts = state.carts.filter((cart) => cart.id !== action.payload.id);
    },
    setCartId(
      state,
      action: PayloadAction<{ idToChange: string; id: string }>
    ) {
      const index = state.carts.findIndex(
        (cart) => cart.id === action.payload.idToChange
      );
      state.carts[index] = { ...state.carts[index], id: action.payload.id };
    },
    setOwnedCart(state, action: PayloadAction<IOwnedCart[]>) {
      state.ownedCarts = action.payload;
    },
    addOwnedCart(state, action: PayloadAction<IOwnedCart>) {
      state.ownedCarts.push(action.payload);
    },
  },
});

const {
  actions: {
    removeSpecificCart,
    setCart,
    updateSpecificCart,
    setCartId,
    setOwnedCart,
  },
  reducer,
} = cartSlice;

export {
  removeSpecificCart,
  setCart,
  updateSpecificCart,
  setCartId,
  setOwnedCart,
  reducer as cartReducer,
};

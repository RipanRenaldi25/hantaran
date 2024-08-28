import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer } from './UserLogedInState';
import { useDispatch, useSelector } from 'react-redux';
import { boxReducer } from './BoxState';
import { orderReducer } from './OrderState';
import { cartReducer } from './Cart';

const store = configureStore({
  reducer: {
    userLogedIn: userLoginReducer,
    box: boxReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer } from './UserLogedInState';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    userLogedIn: userLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

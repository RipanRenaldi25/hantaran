import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserWithProfileAndAddress } from './interface';

type initStateType = {
  userLoginWithProfile: IUserWithProfileAndAddress;
};

const initState: initStateType = {
  userLoginWithProfile: {
    avatar: '',
    email: '',
    full_name: '',
    id: '',
    phone_number: '',
    username: '',
    city: '',
    details: '',
    postal_code: '',
    street: '',
  },
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initState,
  reducers: {
    setUserLoginWithProfile: (
      state,
      action: PayloadAction<IUserWithProfileAndAddress>
    ) => {
      state.userLoginWithProfile = action.payload;
    },
    setUserLoginProps: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      (state.userLoginWithProfile as any)[action.payload.key] =
        action.payload.value;
    },
  },
});

export const {
  actions: { setUserLoginWithProfile, setUserLoginProps },
  reducer: userReducer,
} = userSlice;

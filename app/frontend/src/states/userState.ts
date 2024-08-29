import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserWithProfile } from './interface';

type initStateType = {
  userLoginWithProfile: IUserWithProfile;
};

const initState: initStateType = {
  userLoginWithProfile: {
    avatar: '',
    email: '',
    full_name: ' ',
    id: '',
    phone_number: '',
    username: '',
  },
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initState,
  reducers: {
    setUserLoginWithProfile: (
      state,
      action: PayloadAction<IUserWithProfile>
    ) => {
      state.userLoginWithProfile = action.payload;
    },
  },
});

export const {
  actions: { setUserLoginWithProfile },
  reducer: userReducer,
} = userSlice;

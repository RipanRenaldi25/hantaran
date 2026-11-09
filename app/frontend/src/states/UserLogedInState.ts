import { getUserLogedin, login } from '@/feature/user';
import { getAccessToken } from '@/lib/utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type initStateType = {
  id: string;
  email: string;
  role: 'admin' | 'user' | '';
};

const initialState: initStateType = { id: '', email: '', role: '' };

export const asyncGetUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('User not login yet');
      }
      const user = await getUserLogedin();
      dispatch(setUserLogedIn(user));
    } catch (err) {
      return rejectWithValue(err as { message: string });
    }
  },
);

export const asyncLoginUser = createAsyncThunk(
  'user/loginUser',
  async (
    payload: { uniqueIdentity: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { password, uniqueIdentity } = payload;
      const { accessToken, refreshToken } = await login(
        uniqueIdentity,
        password,
      );
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      const user = await getUserLogedin();
      dispatch(setUserLogedIn(user));
    } catch (err) {
      return rejectWithValue(err as { message: string });
    }
  },
);

const userLogedInSlice = createSlice({
  name: 'userLogedIn',
  initialState,
  reducers: {
    setUserLogedIn: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        role: 'admin' | 'user' | '';
      }>,
    ) => {
      state = action.payload;
      return state;
    },

    resetUserLogedIn: () => {
      return initialState;
    },
  },
});

const { actions, reducer } = userLogedInSlice;
const initState = userLogedInSlice.getInitialState();
const { resetUserLogedIn, setUserLogedIn } = userLogedInSlice.actions;
export {
  actions,
  reducer as userLoginReducer,
  initState,
  resetUserLogedIn,
  setUserLogedIn,
};

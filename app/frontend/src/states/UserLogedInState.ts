import { getUserLogedin } from '@/feature/user';
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
      const data = await getUserLogedin();
      dispatch(setUserLogedIn(data));
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

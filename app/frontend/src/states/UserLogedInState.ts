import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initStateType = {
  id: string;
  email: string;
  role: 'admin' | 'user' | '';
};

const initialState: initStateType = { id: '', email: '', role: '' };

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
      }>
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

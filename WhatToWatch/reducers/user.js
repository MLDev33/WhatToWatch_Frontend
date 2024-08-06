import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null, token: null, email: null},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
        state.value.username = action.payload.username ;
			state.value.token = action.payload.token ;
			state.value.email = action.payload.email ;
      },
      logout: (state) => {
        state.value.token = null;
        state.value.username = null;
        state.value.email= null;
      },
    }
  },
);

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

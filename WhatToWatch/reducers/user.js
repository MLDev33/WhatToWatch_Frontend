import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: null, token: null, email: null, avatar: null},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username ;
			state.value.token = action.payload.token ;
			state.value.email = action.payload.email ;
      state.value.avatar = action.payload.avatar;
      },
      logout: (state) => {
        state.value.token = null;
        state.value.username = null;
        state.value.email= null;
        state.value.avatar= null;
      },
      addAvatar: (state, action) => {
        state.value.avatar = action.payload;
      }
    }
  },
);

export const { login, logout, addAvatar } = userSlice.actions;
export default userSlice.reducer;

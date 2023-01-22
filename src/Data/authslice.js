import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    Login: null,
    userId: null,
  },
  reducers: {
    isLogin: (state, action) => {
      state.Login = action.payload.token;
      state.userId = action.payload.userId;
    },
    isLogout: (state) => {
      state.Login = null;
      state.userId = null;
    },
  },
});

export const { isLogin, isLogout } = authSlice.actions;

export default authSlice.reducer;

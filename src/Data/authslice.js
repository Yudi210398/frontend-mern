import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    Login: false,
    userId: null,
  },
  reducers: {
    isLogin: (state, action) => {
      state.Login = true;
      state.userId = action.payload;
    },
    isLogout: (state) => {
      state.Login = false;
      state.userId = null;
    },
  },
});

export const { isLogin, isLogout } = authSlice.actions;

export default authSlice.reducer;

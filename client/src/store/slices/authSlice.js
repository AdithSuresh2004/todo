import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("loginStatus") || false,
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem("loginStatus", action.payload);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("loginStatus");
    },
  },
});

export const { setLoginStatus, logOut } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;

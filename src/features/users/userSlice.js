import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuth = !!payload;
    },
    logout: () => initialState,
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setAuthReady: (state) => {
      state.isAuth = !!state.user;
    },
  },
});

export const { setUser, logout, setAuthReady, setLoading, setError } =
  userSlice.actions;

export default userSlice.reducer;

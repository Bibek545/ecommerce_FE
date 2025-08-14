// import { createSlice } from "@reduxjs/toolkit";

// const initialState = { user: {}, isAuth: false };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (s, { payload }) => {
//       s.user = payload;
//       s.isAuth = true;
//     },
//     logout: () => initialState,
//   },
// });

// export const { setUser, logout, reducer } = userSlice.actions;
// export default userSlice.reducer;


// src/features/users/userSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,        // store the whole profile here
//   loading: false,
//   error: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, { payload }) => {
//       state.user = payload;
//       state.error = null;
//     },
//     setLoading: (state, { payload }) => {
//       state.loading = payload;
//     },
//     setError: (state, { payload }) => {
//       state.error = payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
// });

// export const { setUser, setLoading, setError, logout } = userSlice.actions;
// export default userSlice.reducer;


// features/users/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authReady: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (s, { payload }) => { s.user = payload; },
    logout: (s) => { s.user = null; s.loading = false; s.error = null; },

    setAuthReady: (s, { payload }) => { s.authReady = payload; },

    // add these:
    setLoading: (s, { payload }) => { s.loading = payload; },
    setError:   (s, { payload }) => { s.error = payload; },
  },
});

export const { setUser, logout, setAuthReady, setLoading, setError } =
  userSlice.actions;

export default userSlice.reducer;

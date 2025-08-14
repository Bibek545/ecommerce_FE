// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice.js";

const store = configureStore({
  reducer: { userInfo: userReducer },
});

export default store;



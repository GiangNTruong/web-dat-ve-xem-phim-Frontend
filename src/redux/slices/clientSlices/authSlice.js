import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  login,
  loadUserFromCookie,
} from "../../../services/clientServices/authService";

import { LOAD_STATUS } from "../../../constants";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: LOAD_STATUS.IDLE,
    data: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      Cookies.remove("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error;
      })
      .addCase(loadUserFromCookie.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;

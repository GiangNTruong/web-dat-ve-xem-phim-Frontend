import { createSlice } from "@reduxjs/toolkit";
import {
  sendOtp,
  verifyOtp,
  changePassword,
  changePasswordUser,
} from "../../../services/clientServices/forgetPasswordService";

const initialState = {
  loading: "idle",
  error: null,
  successMessage: null,
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = "idle";
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.successMessage = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.successMessage = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.successMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      })
      .addCase(changePasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearState } = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;

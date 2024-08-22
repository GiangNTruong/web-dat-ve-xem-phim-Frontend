import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { updateUserDetails } from "../../../services/clientServices/userDetailServices";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        notification.success({
          message: "Thành công",
          description: "Thông tin cá nhân đã được cập nhật.",
        });
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: "Thất bại",
          description: "Cập nhật thông tin cá nhân thất bại.",
        });
      });
  },
});

export const { clearError } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import {
  fetchAllUsers,
  updateUserStatus,
} from "../../../services/adminServices/userServices";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(updateUserStatus.fulfilled, (state, action) => {
      const userId = action.payload;
      state.data.content = state.data.content.map((user) =>
        user.id === userId ? { ...user, status: !user.status } : user
      );
    });
    builder.addCase(updateUserStatus.rejected, (state, action) => {
      state.error = action.payload || action.error.message;
    });
  },
});

export default userSlice.reducer;

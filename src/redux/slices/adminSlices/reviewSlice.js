import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";

import { fetchAllReview } from "../../../services/adminServices/reviewServices";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllReview.pending, (state) => {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchAllReview.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });

    builder.addCase(fetchAllReview.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
  },
});

export default reviewSlice.reducer;

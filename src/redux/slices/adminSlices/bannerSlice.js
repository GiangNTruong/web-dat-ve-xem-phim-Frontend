import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";

import { fetchAllBanner } from "../../../services/adminServices/bannerServices";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBanner.pending, (state) => {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchAllBanner.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });

    builder.addCase(fetchAllBanner.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
  },
});

export default bannerSlice.reducer;


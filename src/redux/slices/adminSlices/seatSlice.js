import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { fetchAllSeats } from "../../../services/adminServices/seatServices";

const seatSlice = createSlice({
  name: "seat",
  initialState: {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSeats.pending, (state) => {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchAllSeats.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });
    
    builder.addCase(fetchAllSeats.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
  },
});

export default seatSlice.reducer;

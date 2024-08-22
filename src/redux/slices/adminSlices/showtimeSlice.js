import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { showTimeByMoviesId } from "../../../services/adminServices/showtimeService";


const showTimeSlice = createSlice({
  name: "showtime",
  initialState: {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showTimeByMoviesId.pending, (state) => {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(showTimeByMoviesId.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });

    builder.addCase(showTimeByMoviesId.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
  },
});

export default showTimeSlice.reducer;

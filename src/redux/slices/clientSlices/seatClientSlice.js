import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { showSeatByRoomId } from "../../../services/clientServices/seatClientService";



const seatClientSlice = createSlice({
  name: "showSeat",
  initialState: {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showSeatByRoomId.pending, (state) => {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(showSeatByRoomId.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });

    builder.addCase(showSeatByRoomId.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
  },
});

export default seatClientSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";

import {
  createTicketPrice,
  deleteTicketPrice,
  fetchAllTicketPrices,
  updateTicketPrice,
} from "../../../services/adminServices/ticketServices";

const ticketPriceSlice = createSlice({
  name: "ticketPrice",
  initialState: {
    loading: LOAD_STATUS.IDLE,
    data: {
      content: [],
      totalElements: 0,
      size: 0,
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTicketPrices.pending, (state) => {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchAllTicketPrices.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });
    builder.addCase(fetchAllTicketPrices.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(createTicketPrice.fulfilled, (state, action) => {
      state.data.content.push(action.payload);
    });
    builder.addCase(createTicketPrice.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(updateTicketPrice.fulfilled, (state, action) => {
      const index = state.data.content.findIndex(
        (discount) => discount.id === action.payload.id
      );
      if (index !== -1) {
        state.data.content[index] = action.payload;
      }
    });
    builder.addCase(updateTicketPrice.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(deleteTicketPrice.fulfilled, (state, action) => {
      state.data.content = state.data.content.filter(
        (discount) => discount.id !== action.payload
      );
    });
    builder.addCase(deleteTicketPrice.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
  },
});

export default ticketPriceSlice.reducer;

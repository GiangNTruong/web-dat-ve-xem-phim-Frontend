import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import {
  fetchAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from "../../../services/adminServices/discountServices";
import {
  fetchAllUserDiscount,
  fetchDiscountId,
} from "../../../services/generalServices";

const discountSlice = createSlice({
  name: "discount",
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
    builder.addCase(fetchAllDiscounts.pending, (state) => {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchAllDiscounts.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });
    builder.addCase(fetchAllDiscounts.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(createDiscount.fulfilled, (state, action) => {
      state.data.content.push(action.payload);
    });
    builder.addCase(createDiscount.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(updateDiscount.fulfilled, (state, action) => {
      const index = state.data.content.findIndex(
        (discount) => discount.id === action.payload.id
      );
      if (index !== -1) {
        state.data.content[index] = action.payload;
      }
    });
    builder.addCase(updateDiscount.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(deleteDiscount.fulfilled, (state, action) => {
      state.data.content = state.data.content.filter(
        (discount) => discount.id !== action.payload
      );
    });
    builder.addCase(deleteDiscount.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(fetchAllUserDiscount.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });
    builder.addCase(fetchAllUserDiscount.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(fetchDiscountId.pending, (state) => {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchDiscountId.fulfilled, (state, action) => {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });
    builder.addCase(fetchDiscountId.rejected, (state, action) => {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
  },
});

export default discountSlice.reducer;

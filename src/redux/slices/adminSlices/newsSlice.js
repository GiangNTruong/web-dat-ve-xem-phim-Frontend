import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { } from "../../../services/adminServices/discountServices";
import
{
  createNews,
  deleteNews,
  fetchAllNews,
  updateNews,
} from "../../../services/adminServices/newsServices";
import { fetchClientNews, fetchNewsById } from "../../../services/generalServices";

const newsSlice = createSlice({
  name: "news",
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
  extraReducers: (builder) =>
  {
    builder.addCase(fetchAllNews.pending, (state) =>
    {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchAllNews.fulfilled, (state, action) =>
    {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });
    builder.addCase(fetchAllNews.rejected, (state, action) =>
    {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(createNews.fulfilled, (state, action) =>
    {
      state.data.content.push(action.payload);
    });
    builder.addCase(createNews.rejected, (state, action) =>
    {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(updateNews.fulfilled, (state, action) =>
    {
      const index = state.data.content.findIndex(
        (discount) => discount.id === action.payload.id
      );
      if (index !== -1)
      {
        state.data.content[ index ] = action.payload;
      }
    });
    builder.addCase(updateNews.rejected, (state, action) =>
    {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(deleteNews.fulfilled, (state, action) =>
    {
      state.data.content = state.data.content.filter(
        (discount) => discount.id !== action.payload
      );
    });
    builder.addCase(deleteNews.rejected, (state, action) =>
    {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(fetchClientNews.pending, (state) =>
    {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchClientNews.fulfilled, (state, action) =>
    {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });
    builder.addCase(fetchClientNews.rejected, (state, action) =>
    {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
    builder.addCase(fetchNewsById.pending, (state) =>
    {
      state.loading = LOAD_STATUS.PENDING;
    });
    builder.addCase(fetchNewsById.fulfilled, (state, action) =>
    {
      state.loading = LOAD_STATUS.FULLFILLED;
      state.data = action.payload;
    });
    builder.addCase(fetchNewsById.rejected, (state, action) =>
    {
      state.loading = LOAD_STATUS.REJECTED;
      state.error = action.payload || action.error.message;
    });
  },
});

export default newsSlice.reducer;

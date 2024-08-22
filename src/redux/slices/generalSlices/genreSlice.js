import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { fetchAllGenres } from "../../../services/generalServices";
const initialState = {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null
};
const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder.addCase(fetchAllGenres.pending, (state) =>
        {
            state.loading = LOAD_STATUS.PENDING;
        });
        builder.addCase(fetchAllGenres.fulfilled, (state, action) => {
          state.loading = LOAD_STATUS.FULLFILLED;
          state.data = action.payload;
        });
        builder.addCase(fetchAllGenres.rejected, (state, action) =>
        {
            state.loading = LOAD_STATUS.REJECTED;
            state.error = action.error.message;
        });
    }
});
export default genreSlice.reducer;
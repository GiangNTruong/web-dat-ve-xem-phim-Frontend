import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { fetchAllClientReviews } from "../../../services/clientServices/clientRevieService";

const initialState = {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
};
const clientReviewSlice = createSlice(
    {
        name: "clientReview",
        initialState,
        reducers: {},
        extraReducers: (builer) =>
        {
            builer.addCase(fetchAllClientReviews.pending, state =>
            {
                state.loading = LOAD_STATUS.PENDING;
            }
            );
            builer.addCase(fetchAllClientReviews.fulfilled, (state, action) =>
            {
                state.loading = LOAD_STATUS.FULLFILLED;
                state.data = action.payload;
            });
            builer.addCase(fetchAllClientReviews.rejected, (state, action) =>
            {
                state.loading = LOAD_STATUS.REJECTED;
                state.data = action.payload;
            });
        }
    }
);
export default clientReviewSlice.reducer;
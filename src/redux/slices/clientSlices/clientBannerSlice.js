import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { fetchAllBannerClient } from "../../../services/clientServices/clientBannerServices";

const initialState = {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
};
const clientBannerSlice = createSlice(
    {
        name: "clientBanner",
        initialState,
        reducers: {},
        extraReducers: (builer) =>
        {
            builer.addCase(fetchAllBannerClient.pending, state =>
            {
                state.loading = LOAD_STATUS.PENDING;
            }
            );
            builer.addCase(fetchAllBannerClient.fulfilled, (state, action) =>
            {
                state.loading = LOAD_STATUS.FULLFILLED;
                state.data = action.payload;
            });
            builer.addCase(fetchAllBannerClient.rejected, (state, action) =>
            {
                state.loading = LOAD_STATUS.REJECTED;
                state.data = action.payload;
            });
        }
    }
);
export default clientBannerSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { fetchBookingHistory } from "../../../services/clientServices/clientBookingService";

const initialState =
{
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
};
const clientBookingSlice = createSlice({
    name: "clientBookingSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => 
    {
        builder.addCase(fetchBookingHistory.pending, state =>
        {
            state.loading = LOAD_STATUS.PENDING;
        }
        );
        builder.addCase(fetchBookingHistory.fulfilled, (state, action) =>
        {
            state.loading = LOAD_STATUS.FULLFILLED;
            state.data = action.payload;
        });
        builder.addCase(fetchBookingHistory.rejected, (state, action) =>
        {
            state.loading = LOAD_STATUS.REJECTED;
            state.error = action.error.message;
        });
    }
});
export default clientBookingSlice.reducer;
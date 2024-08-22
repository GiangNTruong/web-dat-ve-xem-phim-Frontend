import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { fetchPaymentHistory } from "../../../services/clientServices/clientPaymentService";

const initialState =
{
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
};
const clientPaymentSlice = createSlice({
    name: "clientPaymentSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => 
    {
        builder.addCase(fetchPaymentHistory.pending, state =>
        {
            state.loading = LOAD_STATUS.PENDING;
        }
        );
        builder.addCase(fetchPaymentHistory.fulfilled, (state, action) =>
        {
            state.loading = LOAD_STATUS.FULLFILLED;
            state.data = action.payload;
        });
        builder.addCase(fetchPaymentHistory.rejected, (state, action) =>
        {
            state.loading = LOAD_STATUS.REJECTED;
            state.error = action.error.message;
        });
    }
});
export default clientPaymentSlice.reducer;
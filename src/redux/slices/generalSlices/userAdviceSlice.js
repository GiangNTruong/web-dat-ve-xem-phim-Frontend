import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { fetchAllUserAdvices } from "../../../services/generalServices";
const initialState = {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null
};
const userAdviceSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder.addCase(fetchAllUserAdvices.pending, (state) =>
        {
            state.loading = LOAD_STATUS.PENDING;
        });
        builder.addCase(fetchAllUserAdvices.fulfilled, (state, action) =>
        {
            state.loading = LOAD_STATUS.FULLFILLED;
            state.data = action.payload;
        });
        builder.addCase(fetchAllUserAdvices.rejected, (state, action) =>
        {
            state.loading = LOAD_STATUS.REJECTED;
            state.error = action.error.message;
        });
    }
});
export default userAdviceSlice.reducer;
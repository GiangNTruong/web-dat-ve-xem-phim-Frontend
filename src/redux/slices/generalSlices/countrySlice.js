import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { fetchAllCountries } from "../../../services/generalServices";
const initialState = {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null
};
const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder.addCase(fetchAllCountries.pending, (state) =>
        {
            state.loading = LOAD_STATUS.PENDING;
        });
        builder.addCase(fetchAllCountries.fulfilled, (state, action) =>
        {
            state.loading = LOAD_STATUS.FULLFILLED;
            state.data = action.payload;
        });
        builder.addCase(fetchAllCountries.rejected, (state, action) =>
        {
            state.loading = LOAD_STATUS.REJECTED;
            state.error = action.error.message;
        });
    }
});
export default countrySlice.reducer;
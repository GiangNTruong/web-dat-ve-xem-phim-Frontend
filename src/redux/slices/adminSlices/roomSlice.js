import { createSlice } from "@reduxjs/toolkit";
import { LOAD_STATUS } from "../../../constants";
import { addRoom, deleteRoom, editRoom, fetchAllRooms } from "../../../services/adminServices/roomService";

const initialState = {
    loading: LOAD_STATUS.IDLE,
    data: [],
    error: null,
};
const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder.addCase(fetchAllRooms.pending, state =>
        {
            state.loading = LOAD_STATUS.PENDING;
        }
        );
        builder.addCase(fetchAllRooms.fulfilled, (state, action) =>
        {
            state.loading = LOAD_STATUS.FULLFILLED;
            state.data = action.payload;
        });
        builder.addCase(fetchAllRooms.rejected, (state, action) =>
        {
            state.loading = LOAD_STATUS.REJECTED;
            state.error = action.error.message;
        });
        builder.addCase(addRoom.fulfilled, async (state, action) =>
        {
            state.loading = LOAD_STATUS.FULLFILLED;
            state.data = action.payload;
        });
        builder.addCase(addRoom.rejected, (state, action) =>
        {
            state.loading = LOAD_STATUS.REJECTED;
            state.error = action.error.message;
        });
        builder.addCase(deleteRoom.fulfilled, async (state, action) =>
        {
            state.loading = LOAD_STATUS.FULLFILLED;
            state.data = action.payload;
        });
        builder.addCase(deleteRoom.rejected, (state, action) =>
        {
            state.loading = LOAD_STATUS.REJECTED;
            state.error = action.error.message;
        });
        builder.addCase(editRoom.fulfilled, async (state, action) =>
        {
            state.loading = LOAD_STATUS.FULLFILLED;
            state.data = action.payload;
        });
        builder.addCase(editRoom.rejected, (state, action) =>
        {
            state.loading = LOAD_STATUS.REJECTED;
            state.error = action.error.message;
        });
    }
});
export default roomSlice.reducer;
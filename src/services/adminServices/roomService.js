import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const fetchAllRooms = createAsyncThunk("room/fetchAllRooms",
    async ({ page, sortOption, sortDirection }) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.GET ](`admin/rooms?page=${ page - 1 }&sort=${ sortOption },${ sortDirection }`);
        return response;
    }
);
export const addRoom = createAsyncThunk("room/addRoom",
    async (roomToAdd) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.POST ]("admin/rooms", roomToAdd,
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
        return response;
    }
);
export const deleteRoom = createAsyncThunk("room/deleteRoom",
    async (roomId) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.DELETE ](`admin/rooms/${ roomId }`);
        return response;
    }
);
export const editRoom = createAsyncThunk("room/editRoom",
    async (roomToEdit) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.PUT ](`admin/rooms`, roomToEdit);
        return response;
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const fetchBookingHistory = createAsyncThunk("booking/fetchBookingHistory",
    async (userId) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.GET ](`booking?userId=${ userId }`);
        return response;
    });
import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const fetchPaymentHistory = createAsyncThunk("payment/fetchPaymentHistory",
    async (bookingId) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.GET ](`payment?bookingId=${ bookingId }`);
        return response;
    });
import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const fetchAllBannerClient = createAsyncThunk("banner/fetchAllBannerClient",
    async () =>
    {
        const response = await BASE_URL[ HTTP_METHOD.GET ](`banner`);
        return response;
    });
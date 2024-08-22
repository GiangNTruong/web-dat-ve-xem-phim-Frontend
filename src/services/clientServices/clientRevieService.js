import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const fetchAllClientReviews = createAsyncThunk("clientReview/fetchAllClientReviews",
    async () =>
    {
        const response = BASE_URL[ HTTP_METHOD.GET ](`review`);
        return response;
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_METHOD } from "../../constants";
import BASE_URL from "../../api";
import Cookies from "js-cookie";



export const fetchAllReview = createAsyncThunk("review/fetchAllReview", async () => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Token not found");
  }
  const response = await BASE_URL[HTTP_METHOD.GET](`/review`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.result;
});


export const updateReview = createAsyncThunk(
  "review/updateReview",
  async (reviewUpdate) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await BASE_URL[HTTP_METHOD.PUT](`/review`, reviewUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  }
);
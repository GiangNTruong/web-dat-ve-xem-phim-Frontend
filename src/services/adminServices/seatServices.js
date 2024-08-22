import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";
import Cookies from "js-cookie";

export const fetchAllSeats = createAsyncThunk(
  "seat/fetchAllSeats",
  async ({ page }) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await BASE_URL[HTTP_METHOD.GET](
      `/seat?page=${page}&limit=3`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.result;
  }
);

export const updateSeats = createAsyncThunk(
  "seat/updateSeats",
  async (seatUpdate) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await BASE_URL[HTTP_METHOD.PUT](`/seat/update`,seatUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.result;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";


export const showSeatByRoomId = createAsyncThunk(
  "showSeat/showSeatByRoomId",
  async (roomId) => {
    const response = await BASE_URL[HTTP_METHOD.GET](
      `/client/seat?roomId=${roomId}`
    );
    return response.data;
  }
);
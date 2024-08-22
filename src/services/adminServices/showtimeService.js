import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";




export const showTimeByMoviesId = createAsyncThunk(
  "showtime/showTimeByMoviesId",
  async (id) => {
    const response = await BASE_URL[HTTP_METHOD.GET](`/showtime?movieId=${id}`);
    return response.data;
  }
);
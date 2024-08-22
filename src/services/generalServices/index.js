import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const fetchAllCountries = createAsyncThunk(
  "country/fetchAllCountries",
  async () => {
    const response = await BASE_URL[HTTP_METHOD.GET]("countries");
    return response;
  }
);
export const fetchAllGenres = createAsyncThunk(
  "genre/fetchAllGenres",
  async () => {
    const response = await BASE_URL[HTTP_METHOD.GET]("/genres");
    return response.data;
  }
);
export const fetchAllUserAdvices = createAsyncThunk(
  "userAdvices/fetchAllUserAdvices",
  async () => {
    const response = await BASE_URL[HTTP_METHOD.GET]("useradvices");
    return response;
  }
);
export const fetchClientNews = createAsyncThunk(
  "news/fetchClientNews",
  async (page) => {
    const response = await BASE_URL[HTTP_METHOD.GET](`news?page=${page - 1}`);
    return response;
  }
);
export const fetchNewsById = createAsyncThunk(
  "news/fetchNewsById",
  async (newsId) => {
    const response = await BASE_URL[HTTP_METHOD.GET](`news/${newsId}`);
    return response;
  }
);

export const fetchAllUserDiscount = createAsyncThunk(
  "discount/fetchAllUserDiscount",
  async (page) => {
    const response = await BASE_URL[HTTP_METHOD.GET](
      `discount?page=${page - 1}`
    );
    return response;
  }
);

export const fetchDiscountId = createAsyncThunk(
  "discount/fetchDiscountId",
  async (discountId) => {
    const response = await BASE_URL[HTTP_METHOD.GET](`discount/${discountId}`);
    return response;
  }
);

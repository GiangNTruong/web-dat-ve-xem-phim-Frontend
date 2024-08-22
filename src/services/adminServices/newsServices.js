import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";
import Cookies from "js-cookie";

export const fetchAllNews = createAsyncThunk(
  "news/fetchAllNews",
  async ({ page, sortField, sortDirection }) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.GET](
      `/admin/news-management?page=${page - 1}&sortField=${
        sortField || "id"
      }&sortDirection=${sortDirection || "ASC"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
export const createNews = createAsyncThunk(
  "news/createNews",
  async (newsData) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.POST](
      `/admin/news-management`,
      newsData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ id, formData }) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.PUT](
      `/admin/news-management/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const deleteNews = createAsyncThunk("news/deleteNews", async (id) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Token not found");
  }

  await BASE_URL[HTTP_METHOD.DELETE](`/admin/news-management/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
});

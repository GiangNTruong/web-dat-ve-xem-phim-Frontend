import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";
import Cookies from "js-cookie";
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async ({ page, search, sortOption, sortDirection }) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.GET](
      `/admin/user-management?page=${
        page - 1
      }&search=${search}&sort=${sortOption}&direction=${sortDirection}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const updateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async (userId) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    await BASE_URL[HTTP_METHOD.PUT](
      `/admin/user-management/${userId}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return userId;
  }
);

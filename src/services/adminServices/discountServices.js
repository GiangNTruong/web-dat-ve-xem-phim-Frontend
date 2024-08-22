import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";
import Cookies from "js-cookie";

export const fetchAllDiscounts = createAsyncThunk(
  "discount/fetchAllDiscounts",
  async ({ page }) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.GET](
      `/admin/voucher-management?page=${page - 1}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const createDiscount = createAsyncThunk(
  "discount/createDiscount",
  async (discountData) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.POST](
      `/admin/voucher-management`,
      discountData,
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
export const updateDiscount = createAsyncThunk(
  "discount/updateDiscount",
  async ({ id, discountData }) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.PUT](
      `/admin/voucher-management/${id}`,
      discountData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteDiscount = createAsyncThunk(
  "discount/deleteDiscount",
  async (id) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    await BASE_URL[HTTP_METHOD.DELETE](`/admin/voucher-management/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

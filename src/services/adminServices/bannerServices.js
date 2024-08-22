import { createAsyncThunk } from "@reduxjs/toolkit";

import Cookies from "js-cookie";
import { HTTP_METHOD } from "../../constants";
import BASE_URL from "../../api";



export const fetchAllBanner = createAsyncThunk("banner/fetchAllBanner", async () =>
{
  const token = Cookies.get("token");
  if (!token)
  {
    throw new Error("Token not found");
  }
  const response = await BASE_URL[ HTTP_METHOD.GET ](`/banner`, {
    headers: {
      Authorization: `Bearer ${ token }`,
    },
  });

  return response.data.result;
});
export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async (bannerCreate) =>
  {
    const token = Cookies.get("token");
    if (!token)
    {
      throw new Error("Token not found");
    }
    const response = await BASE_URL[ HTTP_METHOD.POST ](`/banner`, bannerCreate, {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    });
    return response.data.result;
  }
);
export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async (bannerDelete) =>
  {
    const token = Cookies.get("token");
    if (!token)
    {
      throw new Error("Token not found");
    }
    const response = await BASE_URL[ HTTP_METHOD.DELETE ](`/banner`, {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
      data: bannerDelete,
    });
    return response.data.result;
  }
);


export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async (bannerUpdate) =>
  {
    const token = Cookies.get("token");
    if (!token)
    {
      throw new Error("Token not found");
    }
    const response = await BASE_URL[ HTTP_METHOD.PUT ](`/banner`, bannerUpdate, {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    });
    console.log("response", response.data);
    return response.data.result;
  }
);

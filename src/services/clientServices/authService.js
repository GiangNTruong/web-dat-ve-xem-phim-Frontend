import axios from "axios";
import Cookies from "js-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await BASE_URL[HTTP_METHOD.POST]("/auth/login", {
        email,
        password,
      });

      const {
        accessToken,
        email: userEmail,
        fullName,
        avatarUrl,
        birthDate,
        address,
        phone,
        username,
        status,
      } = response.data;

      // Lưu mã thông báo truy cập vào cookie
      Cookies.set("token", accessToken, {
        expires: 1,
      });

      // Lưu thông tin người dùng vào cookie với thời gian hết hạn sau 1h
      Cookies.set(
        "userInfo",
        JSON.stringify({
          email: userEmail,
          fullName,
          avatarUrl,
          birthDate,
          address,
          phone,
          username,
          status,
        }),
        { expires: 1 } // 1h
      );

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const loadUserFromCookie = createAsyncThunk(
  "auth/loadUserFromCookie",
  async (userData) => {
    return userData;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";
import Cookies from "js-cookie";

export const updateUserDetails = createAsyncThunk(
  "userDetails/updateUserDetails",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await BASE_URL[HTTP_METHOD.PUT](
        "/user/user-detail",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notification.success({
        message: "Thành công",
        description: "Thông tin cá nhân đã được cập nhật.",
      });

      return response.data;
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Thất bại",
        description: "Cập nhật thông tin cá nhân thất bại.",
      });
      return rejectWithValue(err.response.data);
    }
  }
);

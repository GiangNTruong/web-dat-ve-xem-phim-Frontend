import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const sendOtp = createAsyncThunk(
  "forgetPassword/sendOtp",
  async (email) => {
    const response = await BASE_URL[HTTP_METHOD.POST](
      `/forgotPassword/verifyMail/${email}`,
      { email }
    );
    return response.data;
  }
);

export const verifyOtp = createAsyncThunk(
  "forgetPassword/verifyOtp",
  async ({ otp, email }, thunkAPI) => {
    try {
      const response = await BASE_URL[HTTP_METHOD.POST](
        `/forgotPassword/verifyOtp/${otp}/${email}`,
        { otp, email }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "forgetPassword/changePassword",
  async ({ passwords, email }, thunkAPI) => {
    try {
      const response = await BASE_URL[HTTP_METHOD.POST](
        `/forgotPassword/changePassword/${email}`,
        {
          password: passwords.newPassword,
          repeatPassword: passwords.confirmNewPassword,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changePasswordUser = createAsyncThunk(
  "user/changePassword",
  async ({ newPassword, confirmNewPassword }) => {
    const token = Cookies.get("token");

    const response = await axios.post(
      "/api/v1/user/changePassword",
      {
        password: newPassword,
        repeatPassword: confirmNewPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

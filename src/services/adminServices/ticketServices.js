import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";
import Cookies from "js-cookie";

export const fetchAllTicketPrices = createAsyncThunk(
  "ticket/fetchTicketPrices",
  async ({ page }) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.GET](
      `/admin/ticket-price-management?page=${page - 1}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const createTicketPrice = createAsyncThunk(
  "ticket/createTicketPrice",
  async (ticketData) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.POST](
      `/admin/ticket-price-management`,
      ticketData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const updateTicketPrice = createAsyncThunk(
  "ticket/updateTicketPrice",
  async ({ id, ticketData }) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await BASE_URL[HTTP_METHOD.PUT](
      `/admin/ticket-price-management/${id}`,
      ticketData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteTicketPrice = createAsyncThunk(
  "ticket/deleteTicketPrice",
  async (id) => {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    await BASE_URL[HTTP_METHOD.DELETE](`/admin/ticket-price-management/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

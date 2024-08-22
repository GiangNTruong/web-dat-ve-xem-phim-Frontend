import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const fetchClientMovies = createAsyncThunk("clientMovie/fetchClientMovies",
    async () =>
    {
        const response = BASE_URL[ HTTP_METHOD.GET ](`movies`);
        return response;
    });
export const fetchHotMovies = createAsyncThunk("clientMovie/fetchHotMovies",
    async () =>
    {
        const response = BASE_URL[ HTTP_METHOD.GET ](`movies/hot`);
        return response;
    });

export const searchClientMovies = createAsyncThunk("clientMovie/searchClientMovies",
    async ({ searchValue, searchOption }) =>
    {
        const response = BASE_URL[ HTTP_METHOD.GET ](`movies/search?searchValue=${ searchValue }&searchOption=${ searchOption }`);
        return response;
    });
export const fetchMoviesPageable = createAsyncThunk("clientMovie/fetchMoviesPageable",
    async ({ pageNumber, itemsPerPage }) =>
    {
        const response = BASE_URL[ HTTP_METHOD.GET ](`movies/all/${ pageNumber - 1 }?itemsPerPage=${ itemsPerPage }`);
        return response;
    });
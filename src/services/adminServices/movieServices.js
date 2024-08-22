import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../api";
import { HTTP_METHOD } from "../../constants";

export const fetchAllMovies = createAsyncThunk("movie/fetchAllMovies",
    async ({ page, sortOption, searchValue, sortDirection }) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.GET ](`admin/movies?page=${ page - 1 }&sort=${ sortOption },${ sortDirection }&title=${ searchValue }`);
        return response;
    }
);
export const addMovie = createAsyncThunk("movie/addMovie",
    async (formData) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.POST ]("admin/movies", formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        });
        return response;
    }
);
export const editMovie = createAsyncThunk("movie/editMovie",
    async (formData) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.PUT ]("admin/movies", formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        });
        return response;
    }
);
export const deleteMovie = createAsyncThunk("movie/deleteMovie",
    async (id) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.DELETE ](`admin/movies/${ id }`);
        return response;
    }
);
export const showMovieDetails = createAsyncThunk("movie/showMovieDetails",
    async (id) =>
    {
        console.log("Movie detail ", id);
        const response = await BASE_URL.get(`admin/movies/${id}`);
        return response;
    }
);
export const searchMovie = createAsyncThunk("movie/searchMovie",
    async ({ searchValue, sortOption, page, sortDirection }) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.GET ](`admin/movies/name/${ searchValue }?sort=${ sortOption },${ sortDirection }&page=${ page - 1 }`);
        return response;
    }
);
export const sortMovie = createAsyncThunk("movie/sortMovie",
    async (sort) =>
    {
        const response = await BASE_URL[ HTTP_METHOD.GET ](`admin/movies?sort=${ sort }`);
        return response;
    }
);

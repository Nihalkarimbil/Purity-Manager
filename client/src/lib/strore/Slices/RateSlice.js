import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";

export const getlatestMetalRates = createAsyncThunk(
    "Rate/get",
    async ({ metal, purityId }, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/metalRate/latest", {
                params: { metal, purity: purityId },
            });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);

export const getMetalRates = createAsyncThunk(
    "Rate/getMetalRates",
    async ({ page = 1, limit = 10 }) => {
        const res = await axiosInstance.get(`/metalRate/get?page=${page}&limit=${limit}`);
        return res.data;
    }
);

export const getsearchRates = createAsyncThunk(
    "Rate/getsearchRates",
    async ({ query, page = 1, limit = 10 }) => {
        const res = await axiosInstance.get(`/metalRate/history?metal=${query}&page=${page}&limit=${limit}`);
        return res.data;
    }
);




const RateSlice = createSlice({
    name: "Rate",

    initialState: {
        rates: [],
        totalPages: 1,
        currentPage: 1,
        totalItems: 0,
        loading: false,
        error: null,
    }

    ,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getlatestMetalRates
            .addCase(getlatestMetalRates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getlatestMetalRates.fulfilled, (state, action) => {
                state.loading = false;
                state.rates = action.payload;
            })
            .addCase(getlatestMetalRates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch latest rates";
            })

            // getMetalRates
            .addCase(getMetalRates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMetalRates.fulfilled, (state, action) => {
                state.loading = false;
                state.rates = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(getMetalRates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch all rates";
            })

            // getsearchRates
            .addCase(getsearchRates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getsearchRates.fulfilled, (state, action) => {
                state.loading = false;
                state.rates = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(getsearchRates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to search rates";
            });
    },
});

export default RateSlice.reducer;

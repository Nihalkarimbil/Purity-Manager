import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";


export const getPurities = createAsyncThunk("Purity/get", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get("/purity/get");
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
});

const PuritySlice = createSlice({
    name: "Purity",
    initialState: {
        purities: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPurities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPurities.fulfilled, (state, action) => {
                state.loading = false;
                state.purities = action.payload;
            })
            .addCase(getPurities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch purities";
            });
    }
});

export default PuritySlice.reducer;

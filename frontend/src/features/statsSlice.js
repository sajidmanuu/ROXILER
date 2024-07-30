import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
export const fetchStats = createAsyncThunk(
    'stats/fetchStats',
    async (month) => {
        const { data } = await axiosInstance.get('/api/stats', { params: { month } });
        return data;
    }
);

const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.totalSaleAmount = action.payload.totalSaleAmount;
                state.totalSoldItems = action.payload.totalSoldItems;
                state.totalNotSoldItems = action.payload.totalNotSoldItems;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default statsSlice.reducer;

// src/redux/slices/barChartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../api/axiosInstance';
 // Adjust the import path
 import axiosInstance from '../api/axiosInstance';

export const fetchBarChart = createAsyncThunk(
    'barChart/fetchBarChart',
    async (month) => {
        const { data } = await axiosInstance.get('/api/barchart', { params: { month } });
        return data;
    }
);

const barChartSlice = createSlice({
    name: 'barChart',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBarChart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBarChart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchBarChart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default barChartSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
export const fetchPieChart = createAsyncThunk(
    'pieChart/fetchPieChart',
    async (month) => {
        const { data } = await axiosInstance.get('/api/piechart', { params: { month } });
        return data;
    }
);

const pieChartSlice = createSlice({
    name: 'pieChart',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPieChart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPieChart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPieChart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default pieChartSlice.reducer;

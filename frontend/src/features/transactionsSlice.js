import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async ({ month, search, page, perPage }) => {
        const { data } = await axiosInstance.get('/api/transactions', {
            params: { month, search, page, perPage }
        });
        return data;
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default transactionsSlice.reducer;

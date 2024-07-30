import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './features/transactionsSlice';
import statsReducer from './features/statsSlice';
import barChartReducer from './features/barChartSlice';
import pieChartReducer from './features/pieChartSlice';

const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
        stats: statsReducer,
        barChart: barChartReducer,
        pieChart: pieChartReducer,
    },
});

export default store;

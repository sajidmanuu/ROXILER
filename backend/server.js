import express from 'express';
// import dotenv from 'dotenv';
import connectDB from './config/db.js';
import transactionsRoutes from './routes/transactionsRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import barChartRoutes from './routes/barChartRoutes.js';
import pieChartRoutes from './routes/pieChartRoutes.js';
import cors from 'cors'
// dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/transactions', transactionsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/barchart', barChartRoutes);
app.use('/api/piechart', pieChartRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

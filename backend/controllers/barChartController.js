import asyncHandler from 'express-async-handler';
import Transaction from '../models/Transaction.js';

const getBarChart = asyncHandler(async (req, res) => {
    const { month } = req.query;

    const months = {
        'January': 0,
        'February': 1,
        'March': 2,
        'April': 3,
        'May': 4,
        'June': 5,
        'July': 6,
        'August': 7,
        'September': 8,
        'October': 9,
        'November': 10,
        'December': 11
    };

    const monthIndex = months[month];
    if (monthIndex === undefined) {
        return res.status(400).json({ message: 'Invalid month' });
    }

    // Set the start and end dates for the month across all years
    const startDate = new Date();
    startDate.setMonth(monthIndex, 1); // Start of the month
    startDate.setHours(0, 0, 0, 0);
    startDate.setFullYear(2000); // Arbitrary year to ensure range is applied

    const endDate = new Date(startDate);
    endDate.setMonth(monthIndex + 1); // Start of the next month
    endDate.setHours(0, 0, 0, 0);
    endDate.setFullYear(2100); // Arbitrary year to ensure range is applied

    const query = {
        dateOfSale: { $gte: startDate, $lt: endDate }
    };

    const priceRanges = [
        { range: '0-100', min: 0, max: 100 },
        { range: '101-200', min: 101, max: 200 },
        { range: '201-300', min: 201, max: 300 },
        { range: '301-400', min: 301, max: 400 },
        { range: '401-500', min: 401, max: 500 },
        { range: '501-600', min: 501, max: 600 },
        { range: '601-700', min: 601, max: 700 },
        { range: '701-800', min: 701, max: 800 },
        { range: '801-900', min: 801, max: 900 },
        { range: '901-above', min: 901, max: Infinity },
    ];

    const barChartData = await Promise.all(priceRanges.map(async ({ range, min, max }) => {
        const count = await Transaction.countDocuments({
            ...query,
            price: { $gte: min, $lt: max }
        });
        return { range, count };
    }));

    res.json(barChartData);
});

export { getBarChart };

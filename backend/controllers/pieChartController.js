import asyncHandler from 'express-async-handler';
import Transaction from '../models/Transaction.js';

// @desc    Get pie chart data for a month
// @route   GET /api/piechart
// @access  Public
const getPieChart = asyncHandler(async (req, res) => {
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

    const query = {
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] // MongoDB months are 1-indexed
        }
    };

    const pieChartData = await Transaction.aggregate([
        { $match: query },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { category: '$_id', count: 1, _id: 0 } }
    ]);

    res.json(pieChartData);
});

export { getPieChart };

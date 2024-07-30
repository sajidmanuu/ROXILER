import asyncHandler from 'express-async-handler';
import Transaction from '../models/Transaction.js';

// @desc    Fetch all transactions
// @route   GET /api/transactions
// @access  Public
const getTransactions = asyncHandler(async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    const query = {};

    // Filter by month
    if (month) {
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

        query.$expr = {
            $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] // MongoDB months are 1-indexed
        };
    }

    // Search by title and description (exclude price from regex search)
    if (search) {
        query.$or = [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') }
        ];

        // If search can also be a number, add another condition
        const searchNumber = Number(search);
        if (!isNaN(searchNumber)) {
            query.$or.push({ price: searchNumber });
        }
    }

    const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));

    res.json(transactions);
});

export { getTransactions };

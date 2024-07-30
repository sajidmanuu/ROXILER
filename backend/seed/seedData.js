import axios from 'axios';
import Transaction from '../models/Transaction.js';
import connectDB from '../config/db.js';

connectDB();

const seedData = async () => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany({});
        await Transaction.insertMany(data);
        console.log('Data seeded');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();

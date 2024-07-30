import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    category: String,
    sold: Boolean,
    dateOfSale: Date,
    image: String,
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;

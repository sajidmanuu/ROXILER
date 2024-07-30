import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Sajid:Sajid12345@cluster0.2bv69ly.mongodb.net/Roxiler', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

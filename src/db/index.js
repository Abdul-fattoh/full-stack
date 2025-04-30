import {connect} from 'mongoose';
import {config} from '../config/index.js';

export async function connectDB() {
    try {
        await connect(config.db.url);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}
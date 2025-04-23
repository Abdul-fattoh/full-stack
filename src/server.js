import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import { authRouter } from './routes/auth.routes.js';
config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
await connectDB();

app.use('/api/users', authRouter);

app.listen(PORT, () => console.log('Server running on port', PORT));

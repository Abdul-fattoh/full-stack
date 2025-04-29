import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';

import { authRouter } from './routes/index.js';
// import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// const __dirname = path.resolve();
const filePath = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flag: 'a'
});

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined', {
        stream: filePath
    }));
} else {
    app.use(morgan('dev'));
}

app.use('/api/users', authRouter);

// app.use(errorMiddleware);

export { app };

import express from 'express';
import morgan from 'morgan';

import {appRouter} from './routes/index.js';
import {errorMiddleware} from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/v1', appRouter);

app.use(errorMiddleware);

export default app;
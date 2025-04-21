import {Router} from 'express';

import {authRouter} from './auth.routes.js';
import {userRouter} from './user.routes.js';
import {categoryRouter} from './category.routes.js';
import {orderRouter} from './order.routes.js';
import {productRouter} from './product.routes.js';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/profile', userRouter);
appRouter.use('/category', categoryRouter);
appRouter.use('/order', orderRouter);
appRouter.use('/product', productRouter);
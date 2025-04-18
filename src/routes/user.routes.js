import { Router } from 'express';

import { validateBody } from '../middlewares/validation.middleware.js';
import { userSchema } from '../validations/user.validation.js';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const userRouter = Router();

userRouter
    .get('/:id', userController.profile)
    .put('/:id', authMiddleware,  validateBody(userSchema.update), userController.update)
    .delete('/:id', authMiddleware, userController.delete);
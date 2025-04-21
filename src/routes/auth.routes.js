import {Router} from 'express';

import {validateBody} from '../middlewares/validation.middleware.js';
import {authSchema} from '../validations/auth.validation.js';
import {authController} from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter
    .post('/signUp', validateBody(authSchema.signUp), authController.signUp)
    .post('/signIn', validateBody(authSchema.signIn), authController.signIn)
    .post('/refresh-token', authController.refreshToken);
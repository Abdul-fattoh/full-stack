import { Router } from 'express';

import { UserController } from '../controllers/auth.controller.js';

const router = Router();
const controller = new UserController();

router
    .post('/register', controller.registerUser)
    .post('/login', controller.loginUser)
    .get('/:id', controller.getUserById);

export { router as authRouter }
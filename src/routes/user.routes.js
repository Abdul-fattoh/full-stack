import { Router } from "express";

import { userController } from '../controllers/user.controller.js';
import { dataMiddleware } from '../middleware/data.middleware.js';
import { userSchema, userUpdateSchema, otpSchema } from '../validators/user.validation.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/login', dataMiddleware(userUpdateSchema), userController.signIn);
router.post('/verifyOtp', dataMiddleware(otpSchema), userController.confirmSignIn);

router.post('/register', dataMiddleware(userSchema), userController.createUser);
router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, dataMiddleware(userUpdateSchema), userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

export { router as userRouter };
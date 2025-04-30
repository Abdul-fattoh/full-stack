import { Router } from "express";

import {courseController} from '../controllers/course.controller.js';
import {dataMiddleware} from '../middleware/data.middleware.js';
import {courseSchema, courseUpdateSchema} from '../validators/course.validation.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post('/', verifyToken, dataMiddleware(courseSchema), courseController.create);
router.get('/', verifyToken, courseController.getAll);
router.get('/:id', courseController.getById);
router.put('/:id', dataMiddleware(courseUpdateSchema), courseController.update);
router.delete('/:id', courseController.delete);

export {router as courseRouter};
import { Router } from "express";

import { categoryController } from "../controllers/category.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { categorySchema } from "../validations/category.validation.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const categoryRouter = Router();

categoryRouter
    .post("/", authMiddleware, validateBody(categorySchema.createAndUpdate), categoryController.create)
    .get("/", categoryController.findAll)
    .get("/:id", categoryController.findOne)
    .put("/:id", authMiddleware, validateBody(categorySchema.createAndUpdate), categoryController.update)
    .delete("/:id", authMiddleware, categoryController.delete);
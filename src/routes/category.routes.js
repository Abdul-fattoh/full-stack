import { Router } from "express";

import { categoryController } from "../controllers/category.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { categorySchema } from "../validations/category.validation.js";
import { authMidalware } from '../middlewares/auth.middleware.js';

export const categoryRouter = Router();

categoryRouter
    .post("/", authMidalware, validateBody(categorySchema.createAndUpdate), categoryController.create)
    .get("/", categoryController.findAll)
    .get("/:id", categoryController.findOne)
    .put("/:id", authMidalware, validateBody(categorySchema.createAndUpdate), categoryController.update)
    .delete("/:id", authMidalware, categoryController.delete);
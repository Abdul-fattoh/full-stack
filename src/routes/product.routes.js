import { Router } from "express";

import { productController } from "../controllers/prodect.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { productSchema } from "../validations/product.validation.js";
import { authMidalware } from '../middlewares/auth.middleware.js';

export const productRouter = Router();

productRouter
    .post("/", authMidalware, validateBody(productSchema.create), productController.create)
    .get("/", productController.findAll)
    .get("/:id", productController.findOne)
    .put("/:id", authMidalware, validateBody(productSchema.update), productController.update)
    .delete("/:id", authMidalware, productController.delete);
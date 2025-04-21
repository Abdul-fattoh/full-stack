import { Router } from "express";

import { orderController } from "../controllers/order.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { orderSchema } from "../validations/order.validation.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const orderRouter = Router();

orderRouter
    .post("/", authMiddleware, validateBody(orderSchema.create), orderController.create)
    .get("/", orderController.findAll)
    .get("/:id", orderController.findOne)
    .put("/:id", authMiddleware, validateBody(orderSchema.update), orderController.update)
    .delete("/:id", authMiddleware, orderController.delete);